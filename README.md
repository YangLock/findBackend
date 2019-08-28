# 华工寻物后端

### This is an awesome mini WeChat program
## 小程序主要基本功能
+ 失主发布丢失物品的信息
+ 找到物品的人发布找到物品的信息
+ 在物品详情里可以给对方留言
+ 用户可以输入关键字进行检索
+ 用户可以对自己发布的物品信息进行刷新，使其排在物品列表的上方

## 后端介绍
### 后端使用框架
+ koa2
   + koa-multer 上传图片时用到的上传文件功能
   + koa-static 静态资源托管，将服务器上某个路径下的文件暴露出来
   + koa-bodyparser 解析request的body
   + koa-router 解析路由，解析url
### 数据库连接
+ sequelize 运用ORM技术，避免使用底层的sql语句，使数据库中的表变成方便操作的javascript对象

## 环境
名字|版本|端口
---|:--:|---:
Node.js|12.0|-
sequelize|3.24.1|-
mysql|2.11.1|3306
koa|2.0.0|-

## ENV
ENV|value
---|:--:|---:
NODE_ENV| develop 、test、 production


## 文件树🌲
```
.
├── README.md
├── .vscode                  //启动文件，其中包括环境变量的默认设置
├── config-develop.js        //开发环境数据库配置文件
├── config-production.js     //生产环境数据库配置文件
├── config-test.js           //测试环境数据库配置文件
├── config.js                //配置文件入口
├── controllers
│   ├── api.js               //编写各种接口的文件
├── db.js                    //统一规范model的文件
├── model.js                 //统一导入各种model的文件
├── models
│   ├── findGood.js
│   ├── findPerson.js
│   ├── goodCom.js
│   ├── goodTemporary.js
│   ├── myFindGood.js
│   ├── myFindPerson.js
│   ├── personCom.js
│   ├── personTemporary.js
│   └── userInfor.js
├── package.json             //所有额外导入的包所依赖的环境都在这个文件中列出
├── rest.js                  //统一报错和绑定rest方法
├── records.js               //业务逻辑文件
├── koa.js                   //专门使用koa的js文件
├── train.txt                //数据库建库文件
└── utils                    //一些工具类所构成的文件夹
    └── util.js
```
#### 注：使用过程中，用户间产生的任何纠纷均与本平台无瓜

