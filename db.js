const Sequelize = require('sequelize');
let config=require('./config.js')
console.log('init sequelize...');
var sequelize = new Sequelize(config.database,config.username,config.password,{
    host: config.host,
    dialect: config.dialect,
    pool:{
        max: 5,
        min: 0,
        idle: 1000
    }
});

var defineModel = function(name, attributes) {
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || true;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: true
            };
        }
    }
    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        freezeTableName: true,
        charset: 'utf8',
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                } else {
                    obj.updatedAt = Date.now();
                    obj.version++;
                }
            }
        }
    });
};

module.exports = {
    defineModel,
    STRING: Sequelize.STRING,
    BIGINT: Sequelize.BIGINT,
    DATE: Sequelize.DATE
}
