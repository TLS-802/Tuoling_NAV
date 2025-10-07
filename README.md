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

## 1. 📁 项目结构

<details>
<summary><b>点击展开查看完整目录结构</b></summary>

```
Tuoling_NAV/
├── .github/                           # 1. GitHub 配置
│   ├── FUNDING.yml                    #    赞助配置
│   └── workflows/
│       └── spiderbox-deploy.yml       #    GitHub Actions 自动部署
├── data/                              # 2. 数据文件目录
│   ├── headers.yml                    #    头部配置
│   ├── recommend.yml                  #    推荐资源
│   └── webstack.yml                   #    主要导航数据（核心）
├── static/                            # 3. 静态资源目录
│   ├── CNAME                          #    自定义域名配置
│   ├── robots.txt                     #    搜索引擎爬虫规则
│   ├── edgeone.json                   #    EdgeOne CDN 配置
│   └── baidu_verify_*.html            #    百度站点验证文件
├── themes/                            # 4. 主题目录
│   └── webstack/                      #    WebStack 主题
│       ├── assets/                    #    前端资源
│       │   ├── css/                   #      样式文件
│       │   └── js/                    #      JavaScript 文件
│       ├── layouts/                   #    模板文件
│       │   ├── _default/              #      默认模板
│       │   ├── partials/              #      组件模板
│       │   ├── 404.html               #      404 页面
│       │   └── index.html             #      首页模板
│       ├── static/                    #    主题静态资源
│       ├── LICENSE                    #    许可证
│       └── README.md                  #    主题说明
├── hugo.toml                          # 5. Hugo 配置文件（核心配置）
├── .gitignore                         # 6. Git 忽略规则
├── .hugo_build.lock                   # 7. Hugo 构建锁文件
├── LICENSE-AGPL                       # 8. AGPL-3.0 许可证
├── LICENSE-APACHE                     # 9. Apache-2.0 许可证
└── README.md                          # 10. 项目说明文档
```

</details>

---

## 2. 🌐 部署方式

### 2.1 ☁️ Cloudflare Pages（推荐）

部署步骤：
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

### 2.2 📄 GitHub Pages

推送到 GitHub 后，GitHub Actions 会自动构建并部署到 `gh-pages` 分支。

```bash
# 添加、提交并推送到主分支
git add .
git commit -m "Update site"
git push origin main
```

### 2.3 ▲ Vercel

1. 访问 [Vercel](https://vercel.com/)
2. 点击 **Import Project**
3. 选择你的 GitHub 仓库
4. 选择 **Hugo** 框架
5. 点击 **Deploy** ⚡

---

## 3. ⚙️ 配置指南

### 3.1 基础配置

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

### 3.2 添加导航链接

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

### 3.3 自定义样式

修改 `themes/webstack/assets/css/custom-style.css` 添加自定义样式。

---

## 4. 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

**贡献流程：**
1. **Fork** 本项目到你的 GitHub 账户
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 提交 **Pull Request**

**注意事项：**
- 确保代码符合项目规范
- 添加适当的测试用例
- 更新相关文档

---

## 5. 📄 开源协议

本项目采用双协议授权：

- [AGPL-3.0](LICENSE-AGPL)
- [Apache-2.0](LICENSE-APACHE)

> ⚠️ **重要提示**：使用本项目必须开源，并保留原始版权信息。

**协议选择说明：**
- AGPL-3.0：要求衍生作品开源
- Apache-2.0：更宽松的商业友好协议

---

## 6. 🙏 致谢

感谢以下项目和服务：

**核心技术：**
- [Hugo](https://gohugo.io/) - 静态网站生成器
- [WebStack](https://github.com/WebStackPage/WebStackPage.github.io) - 主题灵感来源

**工具与服务：**
- [Font Awesome](https://fontawesome.com/) - 图标库
- [Cloudflare](https://www.cloudflare.com/) - CDN 服务
- [Tencent EdgeOne](https://edgeone.ai/) - 国内 CDN 加速

---

<div align="center">
  
  ### ⭐ 如果这个项目对你有帮助，请给一个 Star！
  
</div>