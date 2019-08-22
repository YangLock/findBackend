# 华工寻物

### This is an awesome mini WeChat program
## 小程序主要基本功能
+ 失主发布丢失物品的信息
+ 找到物品的人发布找到物品的信息
+ 在物品详情里可以给对方留言
+ 用户可以输入关键字进行检索
+ 用户可以对自己发布的物品信息进行刷新，使其排在物品列表的上方

## 前端介绍
开发中没有用到任何框架，目前还没啥好说的

## 后端介绍
等做好了再说吧

## 文件树🌲
```
.
├── README.md
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
│   ├── my_find_good.js
│   ├── my_find_person.js
│   ├── personCom.js
│   ├── personTemporary.js
│   └── userInfor.js
├── package.json             //所有额外导入的包所依赖的环境都在这个文件中列出，使用时只需执行npm install即可，就将所有依赖关系安装好了
├── rest.js                   //统一报错和绑定rest方法
├── records.js           //业务逻辑文件，后端接口有时会用到很多逻辑上的复杂的操作，可以将这些操作封装到这个文件中，写接口时直接调用即可
├── koa.js              //专门使用koa的js文件
├── train.txt                 //数据库建库文件
└── utils                     //一些工具类所构成的文件夹
    └── util.js
```
#### 注：使用过程中，用户间产生的任何纠纷均与本平台无瓜

