# Python学练写一体化网站 - 技术架构文档

## 1. 技术选型

### 1.1 前端技术栈
- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI组件库**: Tailwind CSS
- **状态管理**: React Context API + useReducer
- **路由**: React Router v6
- **代码编辑器**: CodeMirror 6
- **HTTP客户端**: Axios
- **图标库**: Lucide React

### 1.2 后端技术栈
- **框架**: Express.js + TypeScript
- **数据库**: Supabase (PostgreSQL)
- **认证**: Supabase Auth
- **代码执行**: Docker沙箱 + Python
- **API文档**: Swagger

### 1.3 第三方服务
- **视频托管**: YouTube/Vimeo (嵌入) 或 Cloudflare Stream (上传)
- **CDN**: Cloudflare
- **部署**: Vercel (前端) + Heroku (后端)

## 2. 系统架构

### 2.1 架构图
```
┌─────────────────────┐
│    前端应用        │
│ React + TypeScript │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    API 网关        │
│ Express.js         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  功能模块           │
│ ┌────────────────┐  │
│ │ 课程系统       │  │
│ ├────────────────┤  │
│ │ 项目训练       │  │
│ ├────────────────┤  │
│ │ 代码实操场     │  │
│ ├────────────────┤  │
│ │ 视频教程       │  │
│ ├────────────────┤  │
│ │ 用户系统       │  │
│ ├────────────────┤  │
│ │ 社区讨论区     │  │
│ └────────────────┘  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  数据存储           │
│ Supabase (PostgreSQL) │
└─────────────────────┘
           │
           ▼
┌─────────────────────┐
│  代码执行环境       │
│ Docker 沙箱        │
└─────────────────────┘
```

### 2.2 核心流程
1. **用户认证流程**：用户注册/登录 → Supabase Auth验证 → 生成JWT令牌 → 前端存储令牌 → 请求时携带令牌
2. **代码执行流程**：用户编写代码 → 前端发送代码到后端 → 后端创建Docker容器 → 执行代码 → 返回结果
3. **学习进度流程**：用户学习课程 → 前端发送进度数据 → 后端存储到Supabase → 前端查询进度
4. **视频播放流程**：用户点击视频 → 前端加载视频播放器 → 播放视频（本地或第三方）

## 3. 数据库设计

### 3.1 核心表结构

#### users 表
| 字段名 | 数据类型 | 描述 |
|-------|---------|------|
| id | UUID | 用户ID |
| email | VARCHAR | 用户邮箱 |
| password | VARCHAR | 密码哈希 |
| name | VARCHAR | 用户名 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

#### courses 表
| 字段名 | 数据类型 | 描述 |
|-------|---------|------|
| id | UUID | 课程ID |
| title | VARCHAR | 课程标题 |
| description | TEXT | 课程描述 |
| order | INTEGER | 课程顺序 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

#### chapters 表
| 字段名 | 数据类型 | 描述 |
|-------|---------|------|
| id | UUID | 章节ID |
| course_id | UUID | 课程ID |
| title | VARCHAR | 章节标题 |
| content | TEXT | 章节内容 |
| video_url | VARCHAR | 视频链接 |
| order | INTEGER | 章节顺序 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

#### exercises 表
| 字段名 | 数据类型 | 描述 |
|-------|---------|------|
| id | UUID | 习题ID |
| chapter_id | UUID | 章节ID |
| title | VARCHAR | 习题标题 |
| description | TEXT | 习题描述 |
| solution | TEXT | 参考答案 |
| test_cases | JSONB | 测试用例 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

#### projects 表
| 字段名 | 数据类型 | 描述 |
|-------|---------|------|
| id | UUID | 项目ID |
| title | VARCHAR | 项目标题 |
| description | TEXT | 项目描述 |
| difficulty | VARCHAR | 难度级别 |
| template | TEXT | 代码模板 |
| solution | TEXT | 参考解决方案 |
| challenges | JSONB | 扩展挑战 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

#### progress 表
| 字段名 | 数据类型 | 描述 |
|-------|---------|------|
| id | UUID | 进度ID |
| user_id | UUID | 用户ID |
| entity_type | VARCHAR | 实体类型 (course/chapter/exercise/project) |
| entity_id | UUID | 实体ID |
| progress | INTEGER | 进度百分比 |
| completed | BOOLEAN | 是否完成 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

#### posts 表
| 字段名 | 数据类型 | 描述 |
|-------|---------|------|
| id | UUID | 帖子ID |
| user_id | UUID | 用户ID |
| title | VARCHAR | 帖子标题 |
| content | TEXT | 帖子内容 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

#### comments 表
| 字段名 | 数据类型 | 描述 |
|-------|---------|------|
| id | UUID | 评论ID |
| post_id | UUID | 帖子ID |
| user_id | UUID | 用户ID |
| content | TEXT | 评论内容 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

#### achievements 表
| 字段名 | 数据类型 | 描述 |
|-------|---------|------|
| id | UUID | 成就ID |
| name | VARCHAR | 成就名称 |
| description | TEXT | 成就描述 |
| icon | VARCHAR | 成就图标 |
| created_at | TIMESTAMP | 创建时间 |

#### user_achievements 表
| 字段名 | 数据类型 | 描述 |
|-------|---------|------|
| id | UUID | 记录ID |
| user_id | UUID | 用户ID |
| achievement_id | UUID | 成就ID |
| earned_at | TIMESTAMP | 获得时间 |

## 4. 代码实操场安全执行方案

### 4.1 方案选择
推荐使用 **Docker 沙箱** 方案，原因如下：
- **安全性高**：完全隔离的环境，防止恶意代码执行
- **功能完整**：支持完整的Python生态，可安装第三方库
- **性能稳定**：资源限制可控，不会影响主系统

### 4.2 实现细节
1. **Docker镜像**：使用轻量级Python镜像，如 `python:3.11-slim`
2. **容器配置**：
   - 内存限制：256MB
   - CPU限制：0.5核
   - 网络访问：禁用或限制
   - 文件系统：只读，临时目录可写
   - 执行时间：最大30秒
3. **执行流程**：
   - 接收用户代码
   - 创建临时文件
   - 启动Docker容器执行代码
   - 捕获输出和错误
   - 销毁容器
   - 返回结果
4. **安全措施**：
   - 禁用危险模块（如 os, subprocess）
   - 限制网络访问
   - 限制文件系统访问
   - 超时机制
   - 资源使用限制

### 4.3 备选方案
**Pyodide**：
- **优势**：客户端执行，无需服务器资源
- **劣势**：功能有限，不支持所有Python库

## 5. 分阶段开发路线图

### 5.1 第一阶段（MVP版本）
- **时间**：1个月
- **核心功能**：
  - 项目初始化与环境搭建
  - 用户认证系统
  - 代码编辑器与运行环境
  - 基础课程系统（5个章节）
  - 基础项目训练（5个项目）
  - 学习进度跟踪
- **技术重点**：
  - 搭建基础架构
  - 实现核心代码执行功能
  - 设计数据库结构

### 5.2 第二阶段
- **时间**：1个月
- **核心功能**：
  - 完整课程系统（10-15个章节）
  - 完整项目训练（10个项目）
  - 代码实操场优化
  - 视频教程模块
  - 习题验证系统
- **技术重点**：
  - 完善课程内容
  - 实现视频集成
  - 优化代码执行环境

### 5.3 第三阶段
- **时间**：1个月
- **核心功能**：
  - 社区讨论区
  - 个性化学习路径
  - 成就激励系统
  - 主题切换功能
  - 系统优化与测试
- **技术重点**：
  - 提升用户体验
  - 优化系统性能
  - 确保安全性

## 6. 关键技术挑战与解决方案

### 6.1 代码安全执行
- **挑战**：防止恶意代码执行，保护服务器安全
- **解决方案**：使用Docker沙箱，限制资源使用，禁用危险操作

### 6.2 视频教程集成
- **挑战**：视频存储和带宽成本
- **解决方案**：优先使用第三方视频平台嵌入，减少存储成本

### 6.3 个性化推荐
- **挑战**：构建有效的推荐算法
- **解决方案**：基于用户学习历史和进度，使用简单的推荐规则

### 6.4 系统性能
- **挑战**：代码执行和视频播放的性能优化
- **解决方案**：使用缓存，优化Docker容器启动速度，CDN加速

## 7. 部署与运维

### 7.1 部署架构
- **前端**：Vercel 静态部署
- **后端**：Heroku 容器部署
- **数据库**：Supabase
- **CDN**：Cloudflare

### 7.2 监控与维护
- **日志监控**：使用Heroku Logs
- **性能监控**：使用New Relic或Datadog
- **安全扫描**：定期进行安全扫描

### 7.3 扩展计划
- **水平扩展**：增加Docker容器数量
- **垂直扩展**：升级服务器配置
- **功能扩展**：添加更多课程和项目

## 8. 总结

本技术架构方案为Python学练写一体化网站提供了完整的技术实现路径，包括：
- 前后端技术栈选择
- 系统架构设计
- 数据库表结构
- 代码安全执行方案
- 分阶段开发路线图

通过Docker沙箱确保代码执行安全，通过Supabase提供可靠的数据库服务，通过React和Express构建现代化的前后端应用，本方案能够满足用户对Python学习平台的核心需求，为学习者提供一个安全、高效、功能完善的在线学习环境。