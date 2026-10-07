# 转转机 / Zhuanzhuan 🎰

一个 **local-first** 的随机卡带机：人类可以直接打开网页点着玩，小机也可以通过可选 MCP 使用同一套内置卡带。

**Code: AGPL-3.0-only · Bundled deck content: CC BY-SA 4.0**

## 它有什么

- 纯静态网页，不需要账号或服务器数据库。
- 卡带和当前卡轴布局保存在浏览器本地。
- 抽取历史保存在浏览器本地。
- 支持新建、编辑、复制、分类、搜索、批量管理、随机装轴和 JSON 导入导出。
- 一根卡轴可以一次抽取多个不重复结果。
- 可选本地 MCP，让 AI 读取、创建、修改卡带并执行抽取。
- MCP 默认只监听 `127.0.0.1`，数据默认保存在 `~/.zhuanzhuan/data.json`。
- 网页与 MCP 不做实时双向同步；它们各自保存用户后续修改。

## 自带卡带

首次打开网页或首次启动 MCP，会自带一套 **12 张「剧情创作」卡带，共 657 个候选项**：

时代背景、书本题材、宏观地域、具体场景、世界运行法则、力量体系、居民与文明生态、世界框架、人物关系、身份组合、年龄关系、寿命结构。

公开版只保留卡名、图标、候选内容与备注；私人卡带、私人身份信息、共享数据库、OAuth 和原项目服务器配置都不在这个仓库里。

## 网页

这是纯静态网页，可以部署到 GitHub Pages、Cloudflare Pages、Vercel 等静态托管，也可以本地运行：

```bash
python -m http.server 8080
```

然后打开：

```text
http://127.0.0.1:8080/
```

普通刷新不会清空卡带或已经装好的卡轴。清除站点数据、换浏览器或换设备前，仍建议先导出重要卡带 JSON。

## MCP

需要 Node.js 22 或更新版本。

```bash
cd mcp
npm install
npm test
npm start
```

默认 MCP 地址：

```text
http://127.0.0.1:8787/mcp
```

健康检查：

```text
http://127.0.0.1:8787/health
```

可选环境变量：

```bash
ZHUANZHUAN_DATA=/absolute/path/to/data.json
ZHUANZHUAN_HOST=127.0.0.1
ZHUANZHUAN_PORT=8787
```

MCP 工具：

- `list_decks`
- `get_deck`
- `create_deck`
- `update_deck`
- `delete_deck`
- `draw`
- `get_history`
- `export_data`

不同 MCP 客户端的配置字段可能不同，把本地 HTTP MCP 地址指向 `http://127.0.0.1:8787/mcp` 即可。

## 数据与隐私

网页数据默认只留在当前浏览器；MCP 数据默认只留在当前机器的 JSON 文件里。本项目本身不上传、收集或托管用户卡带。

## 开发检查

仓库自带 GitHub Actions CI。也可以在本地执行：

```bash
cd mcp
npm install
npm run check
npm test
```

浏览器脚本可以使用 Node 做基础语法检查：

```bash
node --check web/core.js
node --check web/app.js
node --check web/history-local.js
```

## License

软件代码使用 **GNU Affero General Public License v3.0 only (AGPL-3.0-only)**。基于本项目代码进行修改、分发，或以修改版通过网络向用户提供服务时，需要遵守 AGPL 的对应源码与同许可证义务。详见 `LICENSE`。

内置 12 张剧情创作卡带及其 657 个候选内容使用 **CC BY-SA 4.0**。对这些内容进行再发布或改编时，需要署名并以相同方式共享。详见 `CONTENT_LICENSE.md`.
