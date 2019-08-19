const db = require('../db');

module.exports = db.defineModel('person_temporary',{
    good_id: {
        type: db.STRING(64),
        primaryKey: true,
        references: {
            model: find_person,
            key: good_id
        },
        allowNull: false
    },
    wechat_num: db.STRING(20),
    qq_num: db.BIGINT(15),
    tel_num: db.BIGINT(11)
});