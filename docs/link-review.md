# Link review decisions / 巡检处理记录

Record report signals, the scope actually checked, the decision and the next trigger. This is not an application test or a promise that a URL works everywhere.

记录报告信号、本次实际核对范围、处理决定及下次触发条件。网络检查不替代功能核验。

## 2026-10-07: review of the October 5 report

[Scheduled run](https://github.com/mansucache/awesome-markdown/actions/runs/37297628326): 207 of 210 URLs reachable. The three exceptions were timeouts or access blocks, not repeated 404/410. The old checker marked all three as `review` and returned a failing job; this batch separates their causes without suppressing them.

| Entry / 条目 | Signal / 信号 | Decision / 决定 | Next trigger / 下次复核 |
| --- | --- | --- | --- |
| WeCom Docs / 企业微信文档 | `https://doc.weixin.qq.com/`: three timeouts | Retain the catalog record; leave reachability unresolved. No evidence from this report establishes discontinuation. 保留条目，可达性仍待复核；本报告不能证明停用。 | Compare the next scheduled run; if the timeout persists, verify the official entry through an ordinary browser. 下次巡检仍超时时，人工浏览官方入口。 |
| Trae | `https://www.trae.cn/` and `/download`: three 403 responses each | Retain both source links and classify as access-blocked; do not claim a successful page review. 保留来源，标为访问受阻，不宣称本轮已读取页面。 | Recheck when the state changes or the official product entry changes. 状态变化或官方入口变化时复核。 |

Scope: inspected the existing run, its downloaded JSON report and the checker's response handling. No application execution, resource deletion or feature-review date change was performed for these signals. The next scheduled run has not yet been evaluated.

范围：读取已有运行与下载的 JSON 报告，检查脚本的响应处理；上述信号不触发应用实测、删除条目或更新功能核验日期。下次定时运行尚未验收。

## 2026-10-07: local comparison run

The updated checker ran against all 213 current catalog and evidence URLs, using the October 5 artifact as its baseline: 211 reachable, zero repeated 404/410, zero access-blocked and two uncertain results. Both Trae URLs recovered in this environment; WeCom still timed out. Typora produced three `TypeError` results in Node's network check, while its [official page](https://typora.io/) was readable through a separate web fetch.

新脚本实际检查 213 个地址，并与 10 月 5 日报告对照：211 个可达，无重复 404/410、无访问受阻，2 个待复核。两个 Trae 地址在本地环境恢复可达；企业微信仍超时。Typora 在 Node 检查中返回三次 `TypeError`，另一次网页读取能获取官网内容。

Decision: retain all three entries. Treat the Typora result as a checker/environment signal, keep the WeCom reachability question open, and compare both in the next scheduled report. This local run does not establish that GitHub runners or every user network will get the same results. JSON/Markdown reports remain in the ignored `reports/` directory.

决定：保留条目。Typora 的结果视为检查环境信号；企业微信可达性继续待复核，下次定时报告对照两者。本地结果不保证 GitHub runner 或所有用户网络得到相同响应。JSON/Markdown 报告保留在忽略的 `reports/` 目录。

## 2026-10-07: GitHub workflow verification

[PR-branch run](https://github.com/mansucache/awesome-markdown/actions/runs/37615923028) completed successfully, including download of the October 5 baseline, comparison, job summary and artifact upload. It checked 213 URLs: 210 reachable, zero unavailable, two access-blocked (Trae) and one uncertain timeout (WeCom). No states changed relative to that baseline. Typora was reachable on the runner.

[PR 分支运行](https://github.com/mansucache/awesome-markdown/actions/runs/37615923028)已通过，实际完成 10 月 5 日基准报告下载、对照、摘要与报告上传。213 个地址中 210 个可达，无确定不可达；两个 Trae 地址受阻，企业微信超时，状态与上次相同。Typora 在 runner 中可达。

Decision: retain the entries and keep the original next-review triggers. The different local/runner responses demonstrate why these signals remain visible instead of being treated as resource discontinuation. This was a manual PR-branch run; a scheduled run of the new workflow on main has not happened yet.

决定：保留条目及原复核触发条件。本地与 runner 响应不同，因此继续保留异常信号，不据此判为项目停用。本轮是 PR 分支手动运行，新工作流在 main 的定时执行尚未发生。
