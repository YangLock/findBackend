const db = require('../db');

module.exports = db.defineModel('userInfor',{
    user_id: {
        primaryKey: true,
        type: db.STRING(64),
        allowNull: false
    },
    user_avatar: db.STRING(100),
    user_name: db.STRING(20),
    wechat_num: db.STRING(20),
    qq_num: db.BIGINT(15),
    tel_num: db.BIGINT(11)
});