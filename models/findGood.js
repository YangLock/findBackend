const db = require('../db');

module.exports = db.defineModel('find_good',{
    good_id: {
        type: db.BIGINT(12),
        primaryKey: true,
        allowNull: false
    },
    good_title: db.STRING(70),
    lost_place: db.STRING(50),
    detail: db.STRING(120),
    typeof: db.STRING(16),
    deliver_time: db.DATE(),
    deliver: {
        type: db.STRING(64),
        references: {
            model: 'userInfor',
            key: 'user_id'
        }
    },
    stateof: db.STRING(10),
    p1: db.STRING(100),
    p2: db.STRING(100),
    p3: db.STRING(100),
    p4: db.STRING(100),
    p5: db.STRING(100),
    p6: db.STRING(100),
    p7: db.STRING(100),
    p8: db.STRING(100),
});