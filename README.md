- [滚动条文档](https://vuescrolljs.yvescoding.org/zh/)
- [TinyMCE 中文文档](http://tinymce.ax-z.cn/)
- [npm](https://www.npmjs.com.cn)
- [axios](http://www.axios-js.com/zh-cn/docs/)
- [Moment.js](http://momentjs.cn/)


## Build Setup

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-admin-template.git

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```



## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

最近迁移git 项目地址。 想保留原有分支和提交 网上搜索了好多步骤都很繁琐。最后发现了最优的解决方案。
1.先克隆老项目的镜像 git clone --mirror old.git (old.git 为老项目的git地址) 
2.进入老项目的目录 cd old.git 
3.移除老项目的地址替换成新项目 git remote set-url --push origin  new.git (new.git 为新项目的git地址) 
 4.将镜像推到远程 git push --mirror  //这一步需要输入新的git的账号和密码
