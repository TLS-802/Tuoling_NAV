<div align="center">
  <img src="themes/webstack/static/logo.png" alt="驼铃电商工具箱" width="200"/>
  
  # 🐫 驼铃电商工具箱
  
  **一个基于 Hugo 的现代化导航网站**
  
  [![Hugo](https://img.shields.io/badge/Hugo-0.139.4-ff4088?style=flat-square&logo=hugo)](https://gohugo.io/)
  [![License](https://img.shields.io/badge/License-AGPL--3.0%20%7C%20Apache--2.0-blue?style=flat-square)](LICENSE-AGPL)
  [![GitHub Stars](https://img.shields.io/github/stars/yourusername/yourrepo?style=flat-square&logo=github)](https://github.com/yourusername/yourrepo)
  
  [在线演示](https://spiderbox.cn/) · [快速开始](#-快速开始) · [部署指南](#-部署方式)
  
</div>

---

## ✨ 特性

<table>
  <tr>
    <td width="50%">
      <h3>🎨 现代化设计</h3>
      <ul>
        <li>简洁美观的界面</li>
        <li>响应式布局，完美适配各种设备</li>
        <li>支持深色/浅色模式切换</li>
      </ul>
    </td>
    <td width="50%">
      <h3>⚡ 性能优异</h3>
      <ul>
        <li>基于 Hugo 静态生成，速度极快</li>
        <li>CDN 加速，全球访问流畅</li>
        <li>资源压缩优化</li>
      </ul>
    </td>
    <td width="50%">
      <h3>📦 易于管理</h3>
      <ul>
        <li>YAML 配置，简单直观</li>
        <li>分类清晰，便于维护</li>
        <li>支持图标、二维码、广告位</li>
      </ul>
    </td>
  </tr>
</table>

---

## 📁 项目结构

<details>
<summary><b>点击展开查看完整目录结构</b></summary>

```
Tuoling_NAV/
├── .github/
│   ├── FUNDING.yml
│   └── workflows/
│       └── spiderbox-deploy.yml        # GitHub Actions 自动部署
├── data/                               # 数据文件目录
│   ├── headers.yml                     # 头部配置
│   ├── recommend.yml                   # 推荐资源
│   └── webstack.yml                    # 主要导航数据（核心）
├── static/                             # 静态资源目录
│   ├── CNAME                           # 自定义域名配置
│   ├── robots.txt                      # 搜索引擎爬虫规则
│   ├── edgeone.json                    # EdgeOne CDN 配置
│   └── baidu_verify_*.html             # 百度站点验证文件
├── themes/                             # 主题目录
│   └── webstack/                       # WebStack 主题
│       ├── assets/                     # 前端资源
│       │   ├── css/
│       │   │   ├── alertify.css        # 弹窗样式
│       │   │   ├── custom-style.css    # 自定义样式
│       │   │   └── style.css           # 主样式文件
│       │   └── js/
│       │       ├── alertify.min.js     # 弹窗插件
│       │       ├── app.js              # 主要交互逻辑
│       │       ├── canvas-nest.umd@2.0.4.js  # 背景动效
│       │       ├── content-search.js   # 搜索功能
│       │       ├── snowfall.min.js     # 下雪特效
│       │       └── spiderbox.js        # 自定义脚本
│       ├── layouts/                    # 模板文件
│       │   ├── _default/
│       │   │   ├── single.html         # 单页模板
│       │   │   └── taxonomy.html       # 分类模板
│       │   ├── partials/               # 组件模板
│       │   │   ├── content_footer.html # 底部
│       │   │   ├── content_header.html # 头部
│       │   │   ├── content_main.html   # 主内容
│       │   │   ├── content_search.html # 搜索框
│       │   │   ├── footer.html         # 页脚
│       │   │   ├── header.html         # 页头
│       │   │   ├── modal_search.html   # 搜索弹窗
│       │   │   └── sidebar.html        # 侧边栏
│       │   ├── 404.html                # 404 页面
│       │   └── index.html              # 首页模板
│       ├── static/                     # 主题静态资源
│       │   ├── favicon.ico
│       │   ├── favicon.png
│       │   └── logo.png
│       ├── LICENSE
│       └── README.md
├── hugo.toml                           # Hugo 配置文件（核心配置）
├── .gitignore                          # Git 忽略规则
├── .hugo_build.lock                    # Hugo 构建锁文件
├── LICENSE-AGPL                        # AGPL-3.0 许可证
├── LICENSE-APACHE                      # Apache-2.0 许可证
└── README.md                           # 项目说明文档
```

</details>

---

## 🚀 快速开始

### 📋 前置要求

- [Hugo](https://gohugo.io/) >= 0.139.4
- [Git](https://git-scm.com/)

### 📥 安装

```bash
# 克隆项目
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo

# 本地预览
hugo server -D

# 访问 http://localhost:1313
```

### 🔨 构建

```bash
# 构建生产版本
hugo --minify

# 输出目录: docs/
```

---

## 🌐 部署方式

<table>
  <tr>
    <th>平台</th>
    <th>适用场景</th>
    <th>特点</th>
  </tr>
  <tr>
    <td><b>☁️ Cloudflare Pages</b></td>
    <td>国际用户</td>
    <td>免费 • 快速 • 零配置</td>
  </tr>
  <tr>
    <td><b>📄 GitHub Pages</b></td>
    <td>个人项目</td>
    <td>完全免费 • 自动部署</td>
  </tr>
  <tr>
    <td><b>▲ Vercel</b></td>
    <td>快速部署</td>
    <td>一键部署 • 自动优化</td>
  </tr>
  <tr>
    <td><b>🇨🇳 Tencent EdgeOne</b></td>
    <td>国内用户</td>
    <td>备案域名 • 国内加速</td>
  </tr>
</table>

### ☁️ Cloudflare Pages（推荐）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** > **Pages**
3. 连接你的 GitHub 仓库
4. 配置构建设置：
   ```
   Build command: hugo --minify
   Build output: docs
   Environment: HUGO_VERSION = 0.139.4
   ```
5. 点击 **Deploy** 🎉

### 📄 GitHub Pages

推送到 GitHub 后，GitHub Actions 会自动构建并部署到 `gh-pages` 分支。

```bash
git add .
git commit -m "Update site"
git push origin main
```

### ▲ Vercel

1. 访问 [Vercel](https://vercel.com/)
2. 点击 **Import Project**
3. 选择你的 GitHub 仓库
4. 选择 **Hugo** 框架
5. 点击 **Deploy** ⚡

---

## ⚙️ 配置

### 基础配置

编辑 `hugo.toml` 修改网站信息：

```toml
baseURL = "https://your-domain.com/"  # 你的域名
title = "你的网站名称"

[params]
    author = "你的名字"
    keywords = "关键词1,关键词2,关键词3"
    description = "网站描述"
    repository = "https://github.com/yourusername/yourrepo"
```

### 添加导航链接

编辑 `data/webstack.yml`：

```yaml
- taxonomy: 新分类
  icon: fas fa-star
  links:
    - title: 网站名称
      logo: logo.png
      url: https://example.com
      description: 网站描述
```

### 自定义样式

修改 `themes/webstack/assets/css/custom-style.css` 添加你的自定义样式。

---

## 🎨 核心功能

| 功能 | 说明 |
|------|------|
| 🔍 **全站搜索** | 实时搜索所有导航链接 |
| 🌙 **深色模式** | 支持浅色/深色主题切换 |
| 📱 **响应式** | 完美适配手机、平板、电脑 |
| 🎯 **分类管理** | 多级分类，清晰有序 |
| ⚡ **快速加载** | CDN 加速，秒开网页 |
| 🔒 **安全可靠** | HTTPS + 安全头部配置 |

---

## 📊 数据管理

所有内容通过 YAML 文件管理，位于 `data/` 目录：

- **webstack.yml** - 主要导航数据（必需）
- **recommend.yml** - 推荐资源
- **headers.yml** - 顶部配置

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

---

## 📄 开源协议

本项目采用双协议授权：

- [AGPL-3.0](LICENSE-AGPL)
- [Apache-2.0](LICENSE-APACHE)

> ⚠️ **重要提示**：使用本项目必须开源，并保留原始版权信息。

---

## 💡 技术栈

![Hugo](https://img.shields.io/badge/Hugo-FF4088?style=for-the-badge&logo=hugo&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

---

## 🙏 致谢

感谢以下项目和服务：

- [Hugo](https://gohugo.io/) - 静态网站生成器
- [WebStack](https://github.com/WebStackPage/WebStackPage.github.io) - 主题灵感来源
- [Font Awesome](https://fontawesome.com/) - 图标库
- [Cloudflare](https://www.cloudflare.com/) - CDN 服务
- [Tencent EdgeOne](https://edgeone.ai/) - 国内 CDN 加速

---

## 📞 联系方式

- **作者**：TLS
- **GitHub**：[@TLS-802](https://github.com/TLS-802)
- **Email**：admin@itbob.cn

---

<div align="center">
  
  ### ⭐ 如果这个项目对你有帮助，请给一个 Star！
  
  Made with ❤️ by [TLS](https://github.com/TLS-802)
  
</div>
