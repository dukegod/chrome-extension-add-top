### webpack-dev-server 详细说明

作为一个单独的模块，

#### 自动刷新

webpack-dev-server支持两种模式来自动刷新页面

+ iframe模式(页面放在iframe中,当发生改变时重载)

Iframe mode是在网页中嵌入了一个iframe，将我们自己的应用注入到这个iframe当中去，因此每次你修改的文件后，都是这个iframe进行了reload。

+ inline模式(将webpack-dev-sever的客户端入口添加到包(bundle)中)

Inline-mode，是webpack-dev-server会在你的webpack.config.js的入口配置文件中再添加一个入口,

两种模式都支持热模块替换(Hot Module Replacement).热模块替换的好处是只替换更新的部分,而不是页面重载.

##### 源码与原理解析

主要研究webpack-dev-server中间的lib/server.js.

```
// 静态服务器
var express = require("express");
var app = this.app = new express();
// socket 服务
var sockjs = require("sockjs");
// 文件重复利用
var StreamCache = require("stream-cache");
// Prepare live html page
var livePage = this.livePage = new StreamCache();
fs.createReadStream(path.join(__dirname, "..", "client", "live.html")).pipe(livePage);

// Prepare the live js file
var liveJs = new StreamCache();
fs.createReadStream(path.join(__dirname, "..", "client", "live.bundle.js")).pipe(liveJs);

// Prepare the inlined js file
var inlinedJs = new StreamCache();
fs.createReadStream(path.join(__dirname, "..", "client", "index.bundle.js")).pipe(inlinedJs);
```

启动了一个使用express的Http服务器,用来加载资源文件。
此外这个Http服务器和client使用了websocket通讯协议，原始文件作出改动后，webpack-dev-server会实时的编译，但是最后的编译的文件并没有输出到目标文件夹
你启动webpack-dev-server后，你在目标文件夹中是看不到编译后的文件的,实时编译后的文件都保存到了内存当中。因此很多同学使用webpack-dev-server进行开发的时候都看不到编译后的文件

##### 监听的文件路径
```
output: {
    path: __dirname,
    filename: 'bundle.js'，
    publicPath: '/dist/'
}
```
webpack-dev-server监听的文件是相对publicPath这个路径的，会直接影响index.html中的引入目录的如下：

```
<script src="dist/bundle.js"></script>
```

### 名词解释

+ --webpack-dev-server - 在 localhost:8080 建立一个 Web 服务器
+ --devtool eval - 为你的代码创建源地址。当有任何报错的时候可以让你更加精确地定位到文件和行号
+ --progress - 显示合并代码进度
+ --colors - Yay，命令行中显示颜色！
+ --content-base build - 指向设置的输出目录

[webpack-dev-server](https://segmentfault.com/a/1190000006670084)
[webpack-dev-server-cli](http://webpack.github.io/docs/webpack-dev-server.html#webpack-dev-server-cli)