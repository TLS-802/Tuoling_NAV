<p align="center">
  <a href="https://spiderbox.cn/" target="_blank" rel="noopener noreferrer">
    <img width="600px" src="/themes/webstack/static/logo.png" alt="logo">
  </a>
</p>

<h1 align="center">驼铃电商工具箱</h1>


#目录结构
themes/webstack/
├── layouts/              # 模板文件
│   ├── index.html       # 首页主模板
│   ├── partials/        # 组件模板
│   │   ├── header.html
│   │   ├── sidebar.html
│   │   ├── content_main.html
│   │   ├── content_search.html
│   │   └── footer.html
│   └── _default/
│       ├── single.html
│       └── taxonomy.html
├── assets/              # 静态资源
│   ├── css/
│   │   ├── style.css
│   │   ├── custom-style.css
│   │   └── alertify.css
│   └── js/
│       ├── app.js           # 主要交互逻辑
│       ├── content-search.js # 搜索功能
│       ├── spiderbox.js     # 自定义脚本
│       └── ...
└── static/
    ├── favicon.ico
    ├── favicon.png
    └── logo.png