/**
 * 配置入口文件，根据NODE_ENV的不同选择不同的数据库配置，即将其他三个配置文件抽象在了一起
 */
const developConfig = './config-develop.js';       //开发环境也就是本地环境
const productionConfig = './config-production.js'; //生产环境也就是线上环境，最终是要部署在服务器上的
const testConfig = './config-test.js';             //测试环境为了能与开发环境区分开来，目前将其也暂定为是在本地的

const fs = require('fs');

var config = null;

if (process.env.NODE_ENV === 'test') {
    console.log('Load ${testConfig}...');
    config = require(testConfig);
} else {
    if(process.env.NODE_ENV === 'develop'){
        console.log('Load ${developConfig}...');
        config = require(developConfig);
    }
    else{
        if(process.env.NODE_ENV === 'production'){
            console.log('Load ${productionConfig}...');
            config = require(productionConfig);
        }
    }
}

module.exports = config;