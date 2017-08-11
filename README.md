## chrome extension

a small plugin for web page.

if some pages don't have the "backtop" button.

you can use the small plugin!

load extension by manifest file!

## 启动
```
npm i 
npm run build
```


### 插件开发步骤总结

[extensions](https://developers.chrome.com/extensions)

主要是 manifest.json文件，配置文件入口，项目权限

直接把`dist`目录引入到谷歌浏览器（开启开发模式）就行了

### 谷歌API接口文档

+ tab: tab点击
+ alarm: 计划任务