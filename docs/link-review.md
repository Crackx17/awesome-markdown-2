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
