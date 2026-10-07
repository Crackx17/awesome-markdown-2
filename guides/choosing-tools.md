# Choose Markdown tools by scenario

[English](choosing-tools.md) | [简体中文](choosing-tools.zh-CN.md)

These common tasks illustrate useful selection questions, not a ranking of every tool. The comparisons are based on project sources, not hands-on testing of each application. Browse the [full catalog](../README.md) for more candidates.

## Start with what you need to manage

| Your need | Compare first | Differences and selection conditions |
| --- | --- | --- |
| Edit existing .md files directly | [Typora](https://typora.io/), [MarkEdit](https://github.com/MarkEdit-app/MarkEdit) | Typora combines editing and preview with multi-format export; MarkEdit targets macOS and scriptable editor extensions. Consider devices, editing style and required output. |
| Maintain a long-lived note collection | [Obsidian](https://obsidian.md/), [Joplin](https://joplinapp.org/) | Obsidian organizes local Markdown files and links; Joplin offers note management, end-to-end encryption and sync options. Compare storage, sync setup and migration of attachments and links. |
| Read existing documents for free | [Markdific](https://markdific.com/pricing/), [Glow](https://github.com/charmbracelet/glow) | Markdific provides a desktop reader, with paid editing/export after the trial; Glow reads in the terminal. Choose the environment; free reading does not imply free editing. |
| Write with a team | [HedgeDoc](https://github.com/hedgedoc/hedgedoc), [Feishu Docs](https://www.feishu.cn/product/docs) | HedgeDoc suits teams able to self-host; Feishu provides cloud collaboration, but Markdown export excludes comments. Decide who operates the service and what content must survive export. |

These selection suggestions use the existing catalog evidence. Browse the [full catalog](../README.md) for more editors and note apps, or the [developer guide](markdown-for-developers.md) for component integration.

## More tasks

| Task | Candidate and official source | Use case | Check before choosing |
| --- | --- | --- | --- |
| Desktop writing | [Typora](https://typora.io/) | Combines Markdown editing and preview in one interface, with outlines, search and PDF, HTML and Word export for desktop writing. | Do you prefer combined editing and preview? Check export dependencies. |
| Mobile writing | [Markor](https://github.com/gsantner/markor) | Edits Markdown, todo.txt and Zim text on Android, including offline notes and plain-text task lists. | Android-only candidate; plan how files reach other devices. |
| Linked notes | [Obsidian](https://obsidian.md/) | Organizes local Markdown notes with links and a graph for building relationships across a long-lived collection of knowledge. | Try moving wiki links and attachments to your target renderer. |
| Research writing | [Zettlr](https://github.com/Zettlr/Zettlr) | A writing workbench for academic and Zettelkasten workflows, with citation management and multi-format export. | Try your reference library and required export format. |
| Team editing | [HedgeDoc](https://github.com/hedgedoc/hedgedoc) | A self-hostable collaborative Markdown editor with real-time editing, diagrams and presentation features for shared documents. | Who will host, back up and maintain the instance? |
| Cloud collaboration | [Feishu Docs](https://www.feishu.cn/product/docs) | Collaborative cloud documents with Markdown export through Download as. Exports retain body structure but exclude comments. | Export a real document; comments are not included. |
| Embed an editor | [Milkdown](https://github.com/Milkdown/milkdown) | A ProseMirror- and remark-based WYSIWYG Markdown editor framework for building an extensible editing interface. | Budget for integration and extensions in your application. |
| Vue editor | [md-editor-v3](https://github.com/imzbf/md-editor-v3) | A Vue 3 Markdown editor component with live preview, dark theme and image paste/upload support. | Confirm Vue 3 and image upload integration requirements. |
| Parse Markdown | [markdown-it](https://github.com/markdown-it/markdown-it) | An extensible JavaScript Markdown parser with CommonMark support and plugin APIs for custom syntax and rendering. | Choose a preset and plugins; reproduce the syntax you need. |
| Render AI output | [Markstream](https://github.com/Simon-He95/markstream-vue) | A family of streaming Markdown renderers for AI output. Choose the package for your framework; markstream-vue targets Vue 3 and Nuxt. | Pick the framework package and test incomplete streamed blocks. |
| One-off conversion | [doc2md](https://github.com/sakuraqqq/doc2md) | Locally converts PDF, DOCX, XLSX, images, TXT and HTML to Markdown in the browser, with OCR and no file upload. Offline use needs cached resources; complex PDF layout may be lost. | Cache resources before offline use; inspect complex PDF tables. |
| Automated extraction | [MarkItDown](https://github.com/microsoft/markitdown) | Microsoft's Python converter for PDF, Word, Excel and other files, designed for text analysis and LLM workflows rather than high-fidelity layout reproduction. | Check extracted structure; do not expect original page layout. |
| File-based slides | [Marp](https://github.com/marp-team/marp) | Creates slides from Markdown with code highlighting, math and PDF or PPTX export for text-based presentation workflows. | Check the exported PDF or PPTX before delivery. |
| Technical talks | [Slidev](https://github.com/slidevjs/slidev) | A Markdown presentation tool for developers with code highlighting, drawing and LaTeX for technical talks. | Test code, formulas and the intended presentation environment. |
| Documentation site | [MkDocs](https://github.com/mkdocs/mkdocs) | Builds project documentation websites from Markdown with configurable themes and plugins. | Check theme and plugin maintenance requirements. |
| Interactive docs | [VitePress](https://github.com/vuejs/vitepress) | A Vite- and Vue-based documentation generator that supports Vue components inside Markdown for interactive documentation. | Use when Vue components serve a concrete documentation need. |

## Decide with one representative sample

Define the output you need, then shortlist two candidates. Use the same document with tables, images, links and required extensions to check editing, export and migration. Record versions and failures instead of comparing feature lists alone.

Start with the [three-configuration compatibility example](markdown-compatibility.md). It demonstrates parser output differences; it does not test the applications in this table. See the [review log](../docs/review-log.md) for catalog evidence.
