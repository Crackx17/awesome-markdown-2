import test from 'node:test';
import assert from 'node:assert/strict';
import {checkUrl,requestTarget,classifyAttempts,summarizeResults,renderReport} from '../scripts/check-links.mjs';

const response=(status)=>({status,url:'https://example.com/final',body:{cancel:async()=>{}}});
test('HEAD rejection falls back to GET',async()=>{
  const methods=[];
  const result=await checkUrl('https://example.com',{fetchFn:async(_,o)=>{methods.push(o.method);return response(o.method==='HEAD'?405:200);},delay:0});
  assert.equal(result.state,'ok');assert.deepEqual(methods,['HEAD','GET']);
});
test('transient failures recover without declaring a dead link',async()=>{
  let calls=0;
  const result=await checkUrl('https://example.com',{fetchFn:async()=>{if(!calls++)throw Error('timeout');return response(200);},delay:0});
  assert.equal(result.state,'ok');assert.equal(calls,2);
});
test('only repeated unavailable statuses qualify as unavailable',async()=>{
  let calls=0;
  assert.equal((await checkUrl('https://example.com',{fetchFn:async()=>{calls++;return response(404);},delay:0})).state,'unavailable');
  assert.equal(calls,3);
  assert.equal((await checkUrl('https://example.com',{fetchFn:async()=>response(403),delay:0})).state,'blocked');
  let n=0;
  assert.equal((await checkUrl('https://example.com',{fetchFn:async()=>response(n++===0?500:404),delay:0})).state,'review');
});
test('repository API routing excludes file URLs and lookalike hosts',()=>{
  assert.equal(requestTarget('https://github.com/owner/repo').api,true);
  assert.equal(requestTarget('https://github.com/owner/repo/blob/main/a.md').api,false);
  assert.equal(requestTarget('https://github.com.example.com/owner/repo').api,false);
});

test('blocked responses are distinct from uncertain network failures',()=>{
  assert.equal(classifyAttempts([403,429,403]),'blocked');
  assert.equal(classifyAttempts(['TimeoutError','TimeoutError']),'review');
  assert.equal(classifyAttempts([404,403]),'review');
});
test('report compares old review states and preserves persistent restrictions',()=>{
  const previous={checkedAt:'2026-10-05T00:00:00Z',results:[
    {url:'a',state:'review',attempts:[403,403,403]},
    {url:'b',state:'unavailable',attempts:[404,404,404]},
    {url:'c',state:'ok',attempts:[200]}
  ]};
  const results=[{url:'a',state:'blocked',attempts:[403]}, {url:'b',state:'ok',attempts:[200]}, {url:'c',state:'unavailable',attempts:[404]}];
  const summary=summarizeResults(results,previous);
  assert.deepEqual(summary.changes.map(r=>[r.url,r.change]),[['b','recovered'],['c','new']]);
  assert.equal(summary.exitCode,1);
  const text=renderReport({checkedAt:'now',total:3,...summary,results});
  assert.match(text,/access-blocked/);assert.match(text,/a.*blocked/);assert.match(text,/b.*recovered/);
});
test('uncertain results remain visible without declaring a dead link',()=>{
  const results=[{url:'a',state:'review',attempts:['TimeoutError']}, {url:'b',state:'blocked',attempts:[403]}];
  const summary=summarizeResults(results);
  assert.equal(summary.exitCode,0);assert.equal(summary.baseline,null);
  assert.match(renderReport({checkedAt:'now',total:2,...summary,results}),/No previous report/);
});
