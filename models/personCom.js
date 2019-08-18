const db = require('../db');

module.exports = db.defineModel('person_com',{
    com_id: {
        type: db.BIGINT(12),
        primaryKey: true,
        allowNull: false
    },
    com_time: db.DATE(),
    com_detail: db.STRING(120),
    com_deliver: {
        type: db.BIGINT(12),
        references: {
            model: userInfor,
            key: user_id
        }
    },
    good_id: {
        type: db.BIGINT(12),
        references: {
            model: find_person,
            key: good_id
        }
    }
});