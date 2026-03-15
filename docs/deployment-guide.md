# Landing Page 部署指南

本指南介绍如何将 HabitLoop Landing Page 部署到免费的静态托管平台。

---

## 方案一：GitHub Pages（推荐）

### 步骤一：创建 GitHub 仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角 **+** > **New repository**
3. 填写仓库名称：`habitloop-official`
4. 选择 **Public**（公开仓库）
5. 点击 **Create repository**

### 步骤二：上传文件

使用 Git 命令上传：

```bash
cd /Users/lamchung/duolingo-habit-tracker/landing-page
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/habitloop-official.git
git push -u origin main
```

### 步骤三：启用 GitHub Pages

1. 进入仓库页面
2. 点击 **Settings** > **Pages**
3. 在 **Source** 下选择 **Deploy from a branch**
4. Branch 选择 **main**，文件夹选择 **/(root)**
5. 点击 **Save**

几分钟后，你的网站将在以下地址可访问：
`https://你的用户名.github.io/habitloop-official/`

---

## 方案二：Vercel（推荐，更快）

### 步骤一：安装 Vercel CLI（可选）

```bash
npm i -g vercel
```

### 步骤二：通过网页部署

1. 访问 [Vercel](https://vercel.com) 并登录
2. 点击 **"Add New..."** > **"Project"**
3. 如果已连接 GitHub，选择你的仓库
4. 或者点击 **"Browse All Files"** 上传 `landing-page` 文件夹
5. 点击 **Deploy**

部署完成后，Vercel 会提供一个 `.vercel.app` 域名。

---

## 方案三：Netlify

### 通过网页部署

1. 访问 [Netlify](https://netlify.com)
2. 登录后，将 `landing-page` 文件夹拖拽到页面中
3. 等待上传完成

---

## 自定义域名

如果已有域名，可以绑定：

### GitHub Pages

在仓库设置中添加自定义域名，然后到域名 DNS 设置中添加 CNAME 记录。

### Vercel / Netlify

在项目设置中添加域名，按提示配置 DNS。

---

## 部署前检查清单

- [ ] 修改 `js/main.js` 中的 Notion API 配置（如果使用）
- [ ] 在浏览器中本地预览 `index.html`，确认功能正常
- [ ] 检查所有链接是否正确
- [ ] 移动端测试（使用浏览器开发者工具或真机）
- [ ] 添加 favicon.ico 到 `images/` 文件夹

---

## 查看提交的数据

### 从 Notion 查看

直接打开你的 Notion 数据库页面，即可看到所有提交记录。

### 从本地存储导出

如果没有配置 Notion API，在浏览器控制台输入：
```javascript
exportSubmissions()
```

---

## 快速部署命令（Vercel）

```bash
cd /Users/lamchung/duolingo-habit-tracker/landing-page
vercel
```

---

## 项目文件结构

```
landing-page/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── main.js         # JavaScript + Notion API
├── images/             # 图片资源（可添加 favicon.ico）
└── README.md           # 说明文件（可选）
```

---

## 下一步

部署完成后：
1. 分享链接，开始收集预注册数据
2. 定期查看提交的数据
3. 根据反馈调整产品方向
4. 当有足够用户后，开始开发完整 APP
