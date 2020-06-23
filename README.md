# kojinbot

[![Build Status](https://github.com/ryuuinc/kojinbot/workflows/Docker/badge.svg)](https://github.com/ryuuinc/kojinbot/actions)

## 介绍

基于 [Telegraf](https://telegraf.js.org/) 构建的 `Telegram Bot`

## 使用

使用 `Swarm mode` 进行部署，需要提供 `API_URL`、`BOT_ENV`、`BOT_TOKEN` 三个环境变量来运行容器

本地调试时自行添加 `.env` 文件和 `SOCKS_PROXY_AGENT` 参数
