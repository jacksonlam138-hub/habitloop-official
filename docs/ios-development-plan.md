# iOS APP 开发技术方案

## 概述

本文档描述 HabitLoop iOS 应用的技术架构和开发方案。

---

## 技术栈选择

### 方案对比

| 技术方案 | 优势 | 劣势 | 推荐度 |
|---------|------|------|-------|
| **SwiftUI + UIKit** | 原生体验最佳、性能最优、API 最新 | 只支持 iOS | ⭐⭐⭐⭐⭐ |
| React Native | 跨平台、热更新 | 性能略差、依赖复杂 | ⭐⭐⭐⭐ |
| Flutter | 跨平台、性能好、UI 一致性高 | 生态较新、包体积大 | ⭐⭐⭐⭐ |

### 推荐：SwiftUI + UIKit 混合开发

- 核心页面使用 SwiftUI（快速开发）
- 复杂交互使用 UIKit（稳定性更好）
- 预留后续 RN/Flutter 迁移空间

---

## 技术架构

```
┌─────────────────────────────────────────────────┐
│                  UI Layer                        │
│  ┌──────────────┐     ┌──────────────┐         │
│  │   SwiftUI    │ +   │    UIKit     │         │
│  │   Views      │     │   Components │         │
│  └──────────────┘     └──────────────┘         │
└─────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────┐
│              Presentation Layer                  │
│  ┌──────────────────────────────────────────┐   │
│  │  ViewModels (MVVM) / Coordinators      │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────┐
│              Business Layer                     │
│  ┌──────────────────────────────────────────┐   │
│  │  Use Cases / Services                     │   │
│  │  - GoalService                            │   │
│  │  - CheckInService                         │   │
│  │  - GamificationService                    │   │
│  │  - CommunityService                       │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────┐
│               Data Layer                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  Repos   │  │ Network  │  │   Local DB   │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
└─────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────┐
│              External Services                   │
│  ┌──────────────┐  ┌──────────────┐             │
│  │  Supabase    │  │ Apple Health │             │
│  └──────────────┘  └──────────────┘             │
└─────────────────────────────────────────────────┘
```

---

## 核心技术选型

### 后端服务：Supabase

| 原因 | 说明 |
|------|------|
| 开源免费 | 降低初期成本 |
| PostgreSQL | 成熟可靠的关系型数据库 |
| 实时订阅 | 支持实时消息和更新 |
| 认证系统 | 内置 OAuth、邮箱登录 |
| Row Level Security | 数据安全 |

### 本地存储

| 技术 | 用途 |
|------|------|
| UserDefaults | 用户设置、轻量数据 |
| CoreData / Realm | 本地缓存、离线数据 |
| Keychain | 敏感信息（Token） |

### UI 框架

| 技术 | 用途 |
|------|------|
| SwiftUI | 现代界面、快速开发 |
| Kingfisher | 图片缓存加载 |
| Lottie | 动画效果 |

### 第三方库

| 库名 | 用途 |
|------|------|
| Supabase-Swift | 后端通信 |
| HealthKit | Apple Health 集成 |
| UserNotifications | 推送通知 |
| RevenueCat | 应用内购买 |

---

## 开发环境配置

### 前置要求

```bash
# macOS 版本
macOS 14.0+

# Xcode 版本
Xcode 15.0+

# CocoaPods / SPM
# 推荐 Swift Package Manager（SPM）
```

### 项目初始化

```bash
# 创建 Xcode 项目
# 使用 SwiftUI + iOS 17.0+

# 项目结构
HabitLoop/
├── HabitLoopApp.swift
├── Models/
├── Views/
├── ViewModels/
├── Services/
├── Repositories/
├── Utilities/
└── Resources/
```

---

## 核心数据模型

```swift
// MARK: - User
struct User: Codable {
    let id: String
    let email: String?
    let nickname: String?
    let avatar: String?
    var level: Int
    var exp: Int
    var streak: Int
    var joinedAt: Date
}

// MARK: - Goal
struct Goal: Codable {
    let id: String
    let userId: String
    var type: GoalType
    var title: String
    var description: String?
    var dailyTasks: [Task]
    var currentProgress: Int
    var target: Int
    var startDate: Date
    var targetDate: Date
    var status: GoalStatus
}

// MARK: - CheckIn
struct CheckIn: Codable {
    let id: String
    let userId: String
    let goalId: String?
    let activityId: String?
    var timestamp: Date
    var mediaUrl: String?
    var note: String?
    var verified: Bool
    var pointsEarned: Int
}

// MARK: - Activity
struct Activity: Codable {
    let id: String
    var organizerId: String
    var title: String
    var description: String?
    var type: ActivityType
    var participantIds: [String]
    var rules: [String]
    var rewards: [String]
    var startDate: Date
    var endDate: Date
    var status: ActivityStatus
}

// MARK: - Achievement
struct Achievement: Codable {
    let id: String
    let name: String
    let description: String
    let icon: String
    let unlockCondition: String
    var unlockedBy: [String]
}
```

---

## 核心功能实现

### 1. 用户认证

```swift
// 使用 Supabase Auth
// 支持：邮箱、Apple ID、Google（可选）
```

### 2. Apple Health 集成

```swift
import HealthKit

class HealthKitManager {
    let healthStore = HKHealthStore()

    // 请求权限
    func requestAuthorization()

    // 同步步数
    func syncSteps(date: Date) -> Double

    // 同步运动消耗
    func syncActiveEnergy(date: Date) -> Double
}
```

### 3. 推送通知

```swift
import UserNotifications

class NotificationManager {
    // 请求权限
    func requestAuthorization()

    // 调度提醒
    func scheduleReminder(time: Date, message: String)

    // 处理点击
    func handleNotification(response: UNNotificationResponse)
}
```

### 4. 应用内购买

```swift
import RevenueCat

class IAPManager {
    // 获取产品信息
    func fetchProducts()

    // 购买会员
    func purchaseMembership()

    // 恢复购买
    func restorePurchases()
}
```

---

## 开发计划

### Sprint 1: 基础框架（1周）
- [ ] 项目初始化
- [ ] UI 框架搭建
- [ ] 导航结构设计
- [ ] Supabase 集成

### Sprint 2: 用户系统（1周）
- [ ] 注册/登录
- [ ] 用户资料页
- [ ] Apple ID 登录

### Sprint 3: 目标管理（2周）
- [ ] 目标创建
- [ ] 目标列表
- [ ] 目标详情页
- [ ] 每日任务展示

### Sprint 4: 打卡功能（2周）
- [ ] 打卡页
- [ ] 拍照/上传
- [ ] 打卡记录
- [ ] 推送提醒

### Sprint 5: 游戏化（2周）
- [ ] 积分系统
- [ ] 等级系统
- [ ] 连续打卡奖励
- [ ] 成就系统

### Sprint 6: 三大活动（3周）
- [ ] 健身/运动模块
- [ ] AI 学习模块
- [ ] 英语学习模块
- [ ] Apple Health 同步

### Sprint 7: 上线准备（2周）
- [ ] 测试与 Bug 修复
- [ ] App Store 资料准备
- [ ] 隐私政策、用户协议
- [ ] 提交审核

---

## App Store 上线清单

### 账号准备
- [ ] Apple Developer Program 账号（¥688/年）
- [ ] App Store Connect 账号
- [ ] TestFlight 测试账号

### 资料准备
- [ ] App 名称、副标题、关键词
- [ ] 应用描述（多语言）
- [ ] 截图（6.5" 和 5.5"）
- [ ] 应用图标
- [ ] 隐私政策 URL
- [ ] 商务联系邮箱

### 合规要求
- [ ] 隐私政策文档
- [ ] 数据使用说明
- [ ] 儿童隐私（如适用）
- [ ] 应用内购买说明

---

## 性能优化

| 优化项 | 方案 |
|--------|------|
| 图片加载 | Kingfisher + WebP |
| 数据缓存 | CoreData + 内存缓存 |
| 列表渲染 | LazyVStack + DiffableDataSource |
| 网络请求 | 并发 + 批量合并 |
| 启动时间 | 延迟加载、预加载 |

---

## 测试策略

| 测试类型 | 工具 | 覆盖范围 |
|---------|------|---------|
| 单元测试 | XCTest | 业务逻辑 |
| UI 测试 | XCTest | 关键流程 |
| 集成测试 | Supabase 本地 | API 交互 |
| Beta 测试 | TestFlight | 真实用户 |

---

## 成本估算

| 项目 | 费用 |
|------|------|
| Apple 开发者账号 | ¥688/年 |
| 域名 | ¥60/年 |
| 云服务（Supabase Pro） | ¥0-500/月（免费版足够初期） |
| 设计工具 | Figma 免费版 |
| CI/CD | GitHub Actions 免费 |

**初期月成本**: ¥0-50（如使用免费方案）

---

## 快速上手 Xcode 开发

### 第一步：安装 Xcode

```bash
# 从 App Store 安装 Xcode 15.0+
```

### 第二步：创建项目

```bash
# 打开 Xcode -> Create New Project
# 选择 iOS -> App
# Language: Swift
# Interface: SwiftUI
```

### 第三步：配置项目

```swift
// HabitLoopApp.swift
import SwiftUI

@main
struct HabitLoopApp: App {
    init() {
        // 配置 Supabase
        configureSupabase()
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

### 第四步：添加 SPM 依赖

1. File -> Add Package Dependencies
2. 添加 Supabase Swift SDK
3. 添加所需第三方库

### 第五步：运行

```bash
# 选择模拟器或真机
# Cmd + R 运行
```

---

## 参考资料

- [SwiftUI 官方文档](https://developer.apple.com/documentation/swiftui)
- [Supabase Swift 文档](https://supabase.com/docs/reference/swift)
- [HealthKit 文档](https://developer.apple.com/documentation/healthkit)
- [App Store 审核指南](https://developer.apple.com/app-store/review/guidelines/)
