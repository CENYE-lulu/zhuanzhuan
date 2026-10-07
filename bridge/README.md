# Zhuanzhuan Self-hosted Sync Bridge 🌉

这是转转机的可选同步桥。默认的 Zhuanzhuan 不需要它：网页仍可只用浏览器本地存储，MCP 仍可只用本地 JSON。

当你希望 **网页与 MCP 共用同一套卡带和卡轴状态** 时，可以在自己的 VPS、NAS、家用服务器或树莓派上运行这个 Bridge。

## 特性

- Node.js 22.5+
- 零第三方运行时依赖
- 使用 Node 内置 SQLite
- SQLite WAL 模式
- version 乐观并发控制
- actionId 幂等重放
- 浏览器离线队列与冲突重试
- 可选 Bearer token
- 精确 Origin 白名单 CORS

## 启动

```bash
cd bridge
export ZHUANZHUAN_BRIDGE_TOKEN='change-me'
export ZHUANZHUAN_ALLOWED_ORIGINS='https://your-name.github.io'
npm start
```

默认：

```text
监听地址  127.0.0.1
端口      8788
数据库    ~/.zhuanzhuan/bridge.sqlite
```

可用环境变量：

```bash
ZHUANZHUAN_BRIDGE_HOST=127.0.0.1
ZHUANZHUAN_BRIDGE_PORT=8788
ZHUANZHUAN_BRIDGE_DATA=/absolute/path/to/bridge.sqlite
ZHUANZHUAN_BRIDGE_TOKEN=change-me
ZHUANZHUAN_ALLOWED_ORIGINS=https://your-name.github.io
```

多个允许的网页来源用逗号分隔。

若监听地址不是 loopback，Bridge 会要求设置 `ZHUANZHUAN_BRIDGE_TOKEN`。

## 公网部署

GitHub Pages 本身是 HTTPS。若网页需要连接公网 Bridge，请给 Bridge 配置 HTTPS（例如通过 Caddy、Nginx 或你自己的反向代理），不要让 HTTPS 页面去请求普通 HTTP 服务。

反向代理只需要转发 Bridge 的 HTTP 服务即可。

健康检查：

```text
GET /health
```

同步 API：

```text
GET  /api/shared-config/zhuanzhuan-spinner
POST /api/shared-config/zhuanzhuan-spinner/actions
```

## 网页连接

打开 Zhuanzhuan 网页里的 **同步设置**，填写 Bridge URL 和你自己设置的 token，先点“测试连接”，成功后再“保存并启用”。

第一次连接时：

1. 远端仍为初始状态时，网页会把本地自定义卡带迁到 Bridge。
2. 当前卡轴布局也会一起迁移。
3. 之后服务器版本成为同步源，同时网页仍保留本地镜像与离线队列。

停用同步不会删除任意一端的数据。

## MCP 连接同一座桥

MCP 进程设置：

```bash
export ZHUANZHUAN_BRIDGE_URL='https://spinner.example.com'
export ZHUANZHUAN_BRIDGE_TOKEN='change-me'
cd mcp
npm start
```

设置 `ZHUANZHUAN_BRIDGE_URL` 后，MCP 的卡带读取、创建、修改、删除都会使用 Bridge；不设置时保持原来的本地 JSON 模式。

MCP 的抽取历史仍保存在运行 MCP 的机器本地，默认位置：

```text
~/.zhuanzhuan/mcp-history.json
```

可用 `ZHUANZHUAN_HISTORY` 修改位置。

## 不是什么

这个 Bridge 不是 Zhuanzhuan 官方云服务，不包含账号系统，也不会连接 CENYE-lulu 的任何服务器。运行它的人就是数据管理员，数据库完全属于部署者自己。
