const db = require('../db');

module.exports = db.defineModel('person_temporary',{
    good_id: {
        type: db.BIGINT(12),
        primaryKey: true,
        references: {
            model: 'find_person',
            key: 'good_id'
        },
        allowNull: false
    },
    contacter: db.STRING(20),
    wechat_num: db.STRING(20),
    qq_num: db.BIGINT(15),
    tel_num: db.BIGINT(11)
});