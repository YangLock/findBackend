/**
 * 此配置文件配置的是测试环境也是自己电脑（本地）的数据库
 */
var config = {
    dialect: 'mysql',
    database: 'testTrain',  //数据库名为了与其他的区分开同时为了统一，咱们就统一叫testTrain吧
    username: 'root',       //用户名
    password: 'www',        //密码就是自己本机的数据库密码了，这个应该没有办法统一了
    host: 'localhost',
    port: 3306
};

module.exports = config;