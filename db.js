const Sequelize = require('sequelize');

console.log('init sequelize...');
var sequelize = new Sequelize('developTrain','root','victor0306',{
    host: 'localhost',
    dialect: 'mysql',
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
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
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
                    if (!obj.id) {
                        obj.id = generateId();
                    }
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
