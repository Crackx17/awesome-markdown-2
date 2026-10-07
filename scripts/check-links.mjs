import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath,pathToFileURL} from 'node:url';

export function requestTarget(source){
  const u=new URL(source);
  const parts=u.pathname.split('/').filter(Boolean);
  const api=u.hostname==='github.com'&&parts.length===2;
  return {url:api?`https://api.github.com/repos/${parts.join('/')}`:source,api};
}

export function classifyAttempts(attempts){
  if(attempts.length&&attempts.every(s=>s===404||s===410))return 'unavailable';
  if(attempts.length&&attempts.every(s=>[401,403,429].includes(s)))return 'blocked';
  return 'review';
}

export function summarizeResults(results,previous=null){
  const counts={ok:0,unavailable:0,blocked:0,review:0};
  const normalize=r=>r.state==='review'?classifyAttempts(r.attempts||[]):r.state;
  const old=new Map((previous?.results||[]).map(r=>[r.url,normalize(r)]));
  const current=new Map(results.map(r=>[r.url,r.state]));
  const changes=[];
  for(const r of results){
    counts[r.state]++;
    if(previous){
      const before=old.get(r.url);
      if(r.state!=='ok'&&(!before||before==='ok'))changes.push({url:r.url,change:'new',before:before||'not checked',after:r.state});
      else if(before&&before!==r.state)changes.push({url:r.url,change:r.state==='ok'?'recovered':'changed',before,after:r.state});
    }
  }
  if(previous)for(const [url,state] of old)if(state!=='ok'&&!current.has(url))changes.push({url,change:'no longer checked',before:state,after:'not checked'});
  return {counts,changes,baseline:previous?.checkedAt||null,exitCode:counts.unavailable?1:0};
}

export function renderReport(report){
  const {counts,changes,baseline}=report;
  const attention=report.results.filter(r=>r.state!=='ok');
  const cell=s=>String(s).replaceAll('|','%7C');
  return ['# Link report','',`${report.checkedAt}: ${counts.ok}/${report.total} reachable. ${counts.unavailable} unavailable, ${counts.blocked} access-blocked, ${counts.review} need review.`,'',
    'Unavailable means repeated 404/410; access-blocked means repeated 401/403/429. Timeouts and other responses need review. None of these states automatically removes a resource. Redirects are in the JSON report. Reachability does not establish content relevance.','',
    baseline?`Compared with ${baseline}.`:'No previous report is available; all non-OK results need an initial review, and no recovery comparison is possible.','',
    '## Changes since previous report','',
    ...(baseline?['| URL | Change | Before | After |','| --- | --- | --- | --- |',...changes.map(r=>`| ${cell(r.url)} | ${r.change} | ${r.before} | ${r.after} |`),...(changes.length?[]:['','No state changes.'])]:['Baseline unavailable.']),'',
    '## All results needing attention','',
    '| URL | Result | Attempts |','| --- | --- | --- |',...attention.map(r=>`| ${cell(r.url)} | ${r.state} | ${r.attempts.join(', ')} |`),''].join('\n');
}

export async function checkUrl(source,{fetchFn=fetch,delay=500,token='',timeout=12000}={}){
  const target=requestTarget(source),attempts=[];
  for(let i=0;i<3;i++){
    try{
      const headers={'User-Agent':'awesome-markdown-link-check'};
      if(target.api&&token)headers.Authorization=`Bearer ${token}`;
      const request=method=>fetchFn(target.url,{method,headers,signal:AbortSignal.timeout(timeout),redirect:'follow'});
      let result=await request(target.api?'GET':'HEAD');
      if(!target.api&&[403,405,501].includes(result.status)){
        await result.body?.cancel();result=await request('GET');
      }
      await result.body?.cancel();
      attempts.push(result.status);
      if(result.status>=200&&result.status<300)return {url:source,state:'ok',status:result.status,finalUrl:result.url,attempts};
    }catch(error){attempts.push(error.name||'Error');}
    if(i<2&&delay)await new Promise(resolve=>setTimeout(resolve,delay*(i+1)));
  }
  return {url:source,state:classifyAttempts(attempts),attempts};
}

async function main(){
  const root=fileURLToPath(new URL('../',import.meta.url));
  const data=JSON.parse(readFileSync(root+'data/catalog.json','utf8'));
  const urls=[...new Set(data.entries.filter(e=>e.status==='active').flatMap(e=>[e.url,...e.links.map(l=>l.url),...e.review.sources]))];
  const results=new Array(urls.length);let next=0,done=0;
  await Promise.all(Array.from({length:6},async()=>{
    while(next<urls.length){const i=next++;results[i]=await checkUrl(urls[i],{token:process.env.GITHUB_TOKEN||''});done++;if(done%25===0)console.log(`Checked ${done}/${urls.length}`);}
  }));
  let previous=null;
  const previousFile=process.env.LINK_CHECK_PREVIOUS;
  if(previousFile){
    // An existing but invalid baseline is an execution error, not a clean report.
    previous=JSON.parse(readFileSync(previousFile,'utf8'));
    if(!previous.checkedAt||!Array.isArray(previous.results))throw Error('Invalid previous link report');
  }
  const summary=summarizeResults(results,previous);
  const report={checkedAt:new Date().toISOString(),total:results.length,ok:summary.counts.ok,...summary,results};
  mkdirSync(root+'reports',{recursive:true});
  writeFileSync(root+'reports/link-check.json',JSON.stringify(report,null,2)+'\n');
  writeFileSync(root+'reports/link-check.md',renderReport(report));
  console.log(`${report.ok}/${report.total} reachable; report: reports/link-check.md`);
  if(summary.counts.blocked||summary.counts.review)console.warn(`${summary.counts.blocked} access-blocked and ${summary.counts.review} uncertain links need human review.`);
  process.exitCode=summary.exitCode;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)await main();
