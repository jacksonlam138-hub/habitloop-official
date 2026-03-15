# Notion API 集成配置指南

本指南说明如何将 Landing Page 的表单数据直接保存到 Notion 数据库。

## 步骤一：创建 Notion Integration

1. 访问 [Notion My Integrations](https://www.notion.so/my-integrations)
2. 点击 **"New integration"**
3. 填写信息：
   - **Name**: HabitLoop Pre-register
   - **Associated workspace**: 选择你的工作区
   - **Type**: Internal
   - **Capabilities**: 勾选 **Read content**, **Update content**, **Insert content**
4. 点击 **Submit** 创建
5. 复制 **"Internal Integration Token"**（以 `secret_` 开头）

## 步骤二：创建 Notion 数据库

在你的 Notion 工作区中创建一个新页面，并添加一个数据库（Database）。

### 数据库属性设置

创建以下列（属性）：

| 属性名称 | 类型 | 说明 |
|---------|------|------|
| Email | Title | 用户邮箱 |
| Activities | Multi-select | 感兴趣的活动（健身/AI/英语） |
| Budget | Select | 预算范围 |
| Features | Multi-select | 最看重的功能 |
| Prepay Interest | Select | 是否愿意预付定金 |
| Timestamp | Date | 提交时间 |

### 为 Select 类型设置选项

**Budget (单选):**
- 0-5
- 5-10
- 10-20
- 20-30
- 30+

**Activities (多选):**
- fitness (健身/运动)
- ai (AI学习)
- english (英语学习)

**Features (多选):**
- community (社群/找伙伴)
- gamification (游戏化奖励)
- tracking (进度追踪)
- reminders (智能提醒)

**Prepay Interest (单选):**
- yes
- maybe
- no

## 步骤三：给 Integration 授权

1. 打开你刚创建的数据库页面
2. 点击右上角 **...** 菜单
3. 选择 **"Add connections"**
4. 搜索并选择 **HabitLoop Pre-register**（你的 Integration 名称）

## 步骤四：获取 Database ID

1. 打开你的数据库页面
2. 查看 URL，复制数据库 ID
3. URL 格式类似：`https://www.notion.so/workspace/[DATABASE_ID]?v=...`
4. 复制 `[DATABASE_ID]` 部分（32个字符）

## 步骤五：配置 Landing Page

打开 `landing-page/js/main.js`，修改以下两行：

```javascript
const NOTION_API_KEY = 'secret_xxxxxxxxxxxxxx'; // 粘贴你的 Integration Token
const NOTION_DATABASE_ID = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // 粘贴你的 Database ID
```

## 步骤六：测试

1. 在浏览器中打开 `landing-page/index.html`
2. 填写并提交表单
3. 检查你的 Notion 数据库，应该能看到新添加的记录

## 备用方案：本地存储

如果暂时不想配置 Notion API，表单数据会自动保存到浏览器的 localStorage 中。

### 导出数据

1. 在浏览器中打开 Landing Page
2. 按 F12 打开开发者工具
3. 在 Console 中输入：`exportSubmissions()`
4. 数据会自动下载为 CSV 文件

### 查看 Console 数据

在 Console 中输入：
```javascript
JSON.parse(localStorage.getItem('habitloop_submissions'))
```

## 常见问题

**Q: 为什么数据没有保存到 Notion？**
A: 检查以下几点：
- Integration Token 是否正确复制
- Database ID 是否正确
- 数据库是否已授权给 Integration
- 浏览器控制台是否有错误信息

**Q: 如何让属性名称显示为中文？**
A: 在 Notion 中修改属性名称，但 API 调用中仍需使用英文属性名。你可以修改 `main.js` 中的 `properties` 键名来匹配你的数据库属性名。

**Q: Notion API 有请求限制吗？**
A: 免费版 Integration 每分钟最多 3 次请求，对于表单提交来说足够了。

**Q: 如何查看 API 调用状态？**
A: 打开浏览器开发者工具 (F12) > Network 标签，查看 `api.notion.com` 的请求状态。

## 安全建议

- 不要将 Integration Token 提交到公开的 Git 仓库
- 使用环境变量存储敏感信息
- 考虑添加速率限制防止滥用

## 后续扩展

当数据量增大后，可以考虑：
- 添加数据验证
- 实现去重（同一邮箱多次提交）
- 添加邮件通知功能
- 与邮件营销工具集成（如 Mailchimp、ConvertKit）
