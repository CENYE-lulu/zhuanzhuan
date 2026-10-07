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
- 默认情况下网页与 MCP 各自使用本地数据；需要时可以部署可选的 **Self-hosted Sync Bridge**，让网页与 MCP 共用同一套卡带和卡轴状态。

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

## 可选自建同步桥 🌉

Zhuanzhuan 默认仍然是 local-first，不要求账号或云服务器。

如果你有自己的 VPS、NAS、家用服务器或树莓派，可以运行仓库里的 `bridge/`，把网页与 MCP 接到同一个 SQLite 数据库：

```text
Web ─┐
     ├─ Self-hosted Bridge ─ SQLite
MCP ─┘
```

Bridge 保留了项目原本实际使用过的同步机制核心：**版本号冲突检测、actionId 幂等、浏览器离线队列、冲突重试与 SQLite 持久化**。

快速启动：

```bash
cd bridge
export ZHUANZHUAN_BRIDGE_TOKEN='change-me'
export ZHUANZHUAN_ALLOWED_ORIGINS='https://your-name.github.io'
npm start
```

然后在网页右上角打开 **同步设置**，填写 Bridge URL 和 token。

让 MCP 使用同一座桥：

```bash
export ZHUANZHUAN_BRIDGE_URL='https://spinner.example.com'
export ZHUANZHUAN_BRIDGE_TOKEN='change-me'
cd mcp
npm start
```

不设置 `ZHUANZHUAN_BRIDGE_URL` 时，MCP 继续使用原来的本地 JSON 模式。

完整部署说明见 `bridge/README.md`。

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

# 可选：让 MCP 改用自建同步桥
ZHUANZHUAN_BRIDGE_URL=https://spinner.example.com
ZHUANZHUAN_BRIDGE_TOKEN=change-me
ZHUANZHUAN_HISTORY=/absolute/path/to/mcp-history.json
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

网页数据默认只留在当前浏览器；MCP 默认只使用当前机器的 JSON 文件。只有用户主动配置自己的 Bridge 后，卡带与卡轴状态才会发送到该用户自己指定的服务器。本项目不提供官方云同步，也不上传或托管用户卡带。

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
node --check shared/sync-client.js

cd bridge
npm run check
npm test
```

## License

软件代码使用 **GNU Affero General Public License v3.0 only (AGPL-3.0-only)**。基于本项目代码进行修改、分发，或以修改版通过网络向用户提供服务时，需要遵守 AGPL 的对应源码与同许可证义务。详见 `LICENSE`。

内置 12 张剧情创作卡带及其 657 个候选内容使用 **CC BY-SA 4.0**。对这些内容进行再发布或改编时，需要署名并以相同方式共享。详见 `CONTENT_LICENSE.md`.
