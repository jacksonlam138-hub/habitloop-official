# HabitLoop - 游戏化习惯打卡应用

> 让习惯养成像游戏一样有趣

---

## 项目简介

HabitLoop 是一款游戏化的习惯养成应用，通过有趣的积分、成就和社群系统，帮助用户设定目标、规划执行路径，并找到志同道合的伙伴一起打卡。

### 核心功能

- 🎯 **智能目标设定** - 自动拆解大目标为每日任务
- 🎮 **游戏化激励** - 连续打卡奖励、积分、成就徽章
- 👥 **社群活动** - 任何人都可以发起打卡活动
- 📊 **进度跟踪** - 可视化成长曲线
- 🏆 **排行榜** - 与伙伴PK，互相激励

### 三大预设活动

| 活动 | 功能 |
|------|------|
| 🏋️ 健身/运动 | Apple Health 同步、月跑挑战、减脂营 |
| 🤖 AI 学习 | 渐进式课程、每日练习、AI 挑战赛 |
| 🌍 英语学习 | 闯关模式、英语角、配音比赛 |

---

## 项目结构

```
duolingo-habit-tracker/
├── docs/                          # 文档目录
│   ├── project-intro.md          # 📝 项目介绍
│   ├── notion-setup-guide.md     # 📋 Notion API 配置指南
│   ├── deployment-guide.md       # 🚀 部署指南
│   ├── product-roadmap.md        # 🗓️ 产品路线图
│   └── ios-development-plan.md  # 📱 iOS 开发方案
└── landing-page/                  # 官网代码
    ├── index.html                # 首页
    ├── css/style.css             # 样式（Dropbox 蓝）
    ├── js/main.js                # 交互 + 表单处理
    └── images/                   # 图片资源
```

---

## 快速开始

### 本地预览

直接在浏览器中打开 `landing-page/index.html`

### 部署上线

参考 [deployment-guide.md](docs/deployment-guide)，支持：
- GitHub Pages
- Vercel
- Netlify

### 配置表单收集

参考 [notion-setup-guide.md](docs/notion-setup-guide.md)，将表单数据保存到 Notion。

---

## 预售计划

| 用户类型 | 权益 |
|---------|------|
| 前500名预注册 | 终身5折优惠 + 创始徽章 |
| 前1000名预注册 | 3个月免费会员 + 内测资格 |
| 所有预注册用户 | 上线后首月免费 |

预计 **2025年Q2** 上线，访问官网即可预注册。

---

## 技术方案

### MVP 阶段（当前）

- 纯静态网站
- Notion API 收集用户数据
- Dropbox 风格的简洁设计

### 完整开发阶段

- iOS 应用（SwiftUI）
- 后端服务（Supabase）
- 游戏化系统
- 社交功能
- 排行榜与 PK

---

## 开发进度

- [x] 项目规划
- [x] 项目介绍文档
- [x] Landing Page 开发
- [x] Notion API 集成
- [x] 部署指南
- [x] 产品路线图
- [x] iOS 开发方案
- [ ] iOS 应用开发（待启动）
- [ ] 后端服务集成（待启动）
- [ ] 上架 App Store（待启动）

---

## 联系方式

- 官网：[habitloop.app](https://habitloop.app)
- 邮箱：hello@habitloop.app

---

## License

© 2025 HabitLoop. All rights reserved.
