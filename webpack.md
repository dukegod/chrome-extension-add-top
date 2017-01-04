## 配置webpack环境

全局安装webpack环境

```
$ npm install webpack -g
```

项目中使用webpack

```
$ npm install webpack --save-dev
```

### 名词解析

+ entry

  - 可以输入字符串，数组
  - 可以当做webpack-dev-server的入口
  - 可以区分离多重页面的加载

  ```
  entry: {
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    app: path.resolve(__dirname, 'app/main.js'),
    mobile: path.resolve(__dirname, 'app/mobile.js'),
    vendors: ['react'] // 其他库
  }，
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js' // 注意我们使用了变量
  },
  ```
  前面的两个引入主要是为了静态服务器，本人不推荐这么写，可以直接在npm script中进行配置。    
  **多页面开发**，需要设置多个输入文件，然后根据不同的输入文件，输出文件进行相应的改变。  
  **vendors** 用来分离第三方的应用，优化加载


+ output ： 输出文件

+ module : 加载的loader

+ resolve

  - webpack在构建包的时候会按目录的进行文件的查找，resolve属性中的extensions数组中用于配置程序可以自行补全那些文件后缀
  - 修改搜索路径用alias

  ```
  resolve: {
    alias: {
      js: path.join(__dirname, "./src/scripts")
    },
    extensions: ['', '.js']
  }

  // 引用注意加上js
  require('js/index.js')
  ```


+ exclude : 排除一些文件，不检测这些文件

+ plugin 加载插件

+ externals 加载第三方文件

想在项目中require一些其他的类库或者API        
加载CDN   
而又不想让这些类库的源码被构建到运行时文件中，此时我们就可以通过配置externals参数来解决这个问题

```
 externals: {
     "jquery": "jQuery"
 }
 externals: {   
    // 指定采用外部 CDN 依赖的资源，不被webpack打包
    // <script src="//cdn.com/lib/vue/1.0.1/vue.js"></script>
    // <script src="//cdn.com/lib/vue-resource/0.8.0/vue-resource.js"></script>
    "vue": "Vue",
    "vue-resource": "VueResource",
  },

```

这样我们就可以放心的在项目中使用这些API了：var jQuery = require("jquery");

### Loader

强大的Loader使我们开发更加方便,常用的loader

+ url-loader

```
{
  test: /\.(png|jpg|gif)$/,
  loader: 'url',
  query: {
    limit: 102400,
    name: '[name].[ext]?[hash]'
  }
}
```
+ fonts

```
{
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url",
    query: {
      name: '[name].[ext]?[hash]&mimetype=application/font-woff'
    }
},
{
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url",
    query: {
      name: '[name].[ext]?[hash]&mimetype=application/font-woff2'
    }
},
{
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url",
    query: {
      name: '[name].[ext]?mimetype=application/font-woff2'
    }
},
{
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url",
    query: {
      name: '[name].[ext]?mimetype=application/font-woff2'
    }
},
{
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url",
    query: {
      name: '[name].[ext]?mimetype=image/svg+xml'
    }
},
```

#### 样式处理loader

+ [style-loader](https://github.com/webpack/style-loader)
+ [css-loader](https://github.com/webpack/css-loader)
```
// config.js
module: {
  loaders: [
    {test: /\.css$/, loader: 'style!css'}
  ]
}
```
加载 CSS 需要 css-loader 和 style-loader，他们做两件不同的事情，css-loader会遍历 CSS 文件，然后找到 url() 表达式然后处理他们，style-loader 会把原来的 CSS 代码插入页面中的一个 style 标签中。

### webpack 配置文件

webpack 启动项目比较的多，建议多使用package.json中配置脚步启动项目管理

#### 配置开发环境（webpack.config.js）

Webpack 开发工具，要单独安装，主要用来本地启动一个服务

```
$ npm install webpack-dev-server --save-dev
```

配置文件可以如下写
```
"scripts": {
  "dev":"webpack-dev-server --devtool eval-source-map --progress --colors --hot --inline --content-base ./",
}
```

#### 配置生产环境(webpack.production.config.js)

```
"scripts": {
  "deploy": "NODE_ENV=production webpack -p --config webpack.production.config.js"
}
```

### webpack之 插件管理




