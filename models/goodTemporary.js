const db = require('../db');

module.exports = db.defineModel('good_temporary',{
    good_id: {
        type: db.BIGINT(12),
        primaryKey: true,
        references: {
            model: 'find_good',
            key: 'good_id'
        },
        allowNull: false
    },
    contacter: db.STRING(20),
    wechat_num: db.STRING(20),
    qq_num:  db.BIGINT(15),
    tel_num: db.BIGINT(11),
});