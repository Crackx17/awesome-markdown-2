# Maintaining the catalog / 维护说明

## One source, two languages

`data/catalog.json` is the source of truth. Keep IDs stable and translate meaning, including limitations. `npm run build` generates README.md (English), README.zh-CN.md (Chinese), readme.en.md (legacy English entry point), and bilingual review/history pages. Chinese category anchors are retained in the English homepage for old links.

数据是唯一条目来源。修改条目后生成双语文件，不手工维护两份清单。旧英文文件与原中文分类锚点保留兼容入口。

```sh
npm ci --ignore-scripts
npm run build
npm run verify
npm run example
npm run links
```

## Review scope / 核验范围

Review dates record when the stated check took place, not an expiry guarantee. Basic metadata checks do not validate every feature. Recheck primary documentation when changing a platform, pricing or capability claim. Record precisely what was reviewed. Reserve `tested` for documented experiments with versions, inputs and results.

确认停用、域名改作他用或不满足 Markdown 收录范围时，保留记录并改为 `withdrawn`；来源不足时使用 `pending` 和 `needs-review`。更新核验日期时同时说明本次实际检查范围，不把自动链接检查当成功能实测。

## Automation / 自动检查

Pull requests and pushes to main run catalog validation, generation drift checks, internal link and anchor validation, parser fixtures and awesome-lint. Repeated navigation links are intentional; catalog URLs have a separate uniqueness check. The conventional locale filename, Chinese punctuation and the deliberate task-before-contents order need narrow lint exceptions in generated Markdown. The contents-order rule is disabled, while internal navigation and anchors remain validated.

The weekly link workflow and manual `npm run links` write a report under ignored `reports/`. Repeated 404/410 responses are `unavailable`; repeated 401/403/429 responses are `blocked`; timeouts and other uncertain failures are `review`. The command fails for unavailable links or execution errors; blocked and uncertain results remain visible in the job summary and artifact, without declaring the links dead. Reports never remove entries or rewrite review dates. Inspect redirects and replacement URLs before changing a record. GitHub repository checks may use `GITHUB_TOKEN` only with api.github.com.

每周报告不自动删条目。重复 404/410 返回失败状态；重复 401/403/429 单列为访问受阻，超时等异常单列为待复核，仍保留在摘要和报告中。脚本执行异常独立报错，不把失败悄悄变成通过。

The workflow downloads the previous completed run's artifact and compares URL states: new issues, recovered URLs, changed states and URLs no longer checked. Missing/expired artifacts mean no baseline is available; this is stated explicitly. Manual comparisons use `LINK_CHECK_PREVIOUS=/path/to/link-check.json npm run links`. A green run means no repeated 404/410 or execution failure was found, not that every URL was verified.

工作流下载上次已结束运行的报告，对照新增、恢复、状态变化与不再检查的地址；报告缺失或过期时明确提示无法比较。手动对照可设置 `LINK_CHECK_PREVIOUS`。绿色运行不表示所有地址均可达，仍需查看访问受阻与待复核项目。

## Resolve report findings / 处理巡检结果

Read the report, identify affected entries and check original sources. Record whether each signal needs a link update, further review or retention. Keep the reason and next review trigger in the [link review log](link-review.md); then regenerate and check affected files if a catalog change is warranted. Do not delete resources based on an access block or change their source-review dates for a network-only check.

维护者读取报告 → 定位条目与来源 → 判断更新、保留或继续复核 → 在[巡检处理记录](link-review.md)写清理由与复核触发条件 → 如需改条目则生成并检查。未完成复核的异常保持开放，报告已生成不等于已处理。

Before merging, consider a changelog entry for new resources, meaningful selection changes or navigation changes. Typo-only fixes need not create one. Recheck About and Topics when the scope or public language changes; homepage stays empty until a real website is deployed.

合并前判断是否需要补更新记录；资源新增、重要选型信息与导航变化应记录，纯错字无需单独记一条。范围或主语言变化时复查 About 与 Topics；未部署网站时不填写猜测地址。

## Reproducible examples / 示例维护

When parser versions or fixtures change, run `npm run example`, inspect the output differences, update both compatibility guides and run `npm run verify`. The checked HTML is for a trusted fixture, not a sanitizer for untrusted Markdown.

## Community feedback / 社区反馈

Use the recommendation, correction and experience forms to collect specific tasks and evidence. Start discussion around the selection guide or a reproducible compatibility result. Track which feedback produces useful corrections; avoid submitting the same promotional message across communities. A website and external promotion are separate future work.

[English catalog](../README.md) · [中文版](../README.zh-CN.md)
