# 驼铃电商工具箱

一个基于 Hugo 的导航网站项目。

## 项目结构

```
Tuoling_NAV/
├── .github/
│   ├── FUNDING.yml
│   └── workflows/
│       └── spiderbox-deploy.yml        # GitHub Actions 自动部署
├── data/                               # 数据文件目录
│   ├── advertisement.yml               # 广告配置
│   ├── friendlinks.yml                 # 友情链接
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

## 快速开始


### GitHub Pages

推送到 GitHub 后，GitHub Actions 会自动构建部署到 `gh-pages` 分支。

### Cloudflare Pages

1. 登录 Cloudflare，进入 **Pages**
2. 连接 GitHub 仓库
3. 配置：
   - Build command: `hugo --minify`
   - Build output: `docs`
   - 环境变量: `HUGO_VERSION = 0.139.4`

### Vercel

1. 访问 [Vercel](https://vercel.com/)
2. Import GitHub 仓库
3. 选择 Hugo 框架
4. 点击 Deploy

## 配置

修改 `hugo.toml`:

```toml
baseURL = "https://your-domain.com/"
title = "你的网站名称"

[params]
    author = "你的名字"
```

## 许可

AGPL-3.0 & Apache-2.0