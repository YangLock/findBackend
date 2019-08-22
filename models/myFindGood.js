const db = require('../db');

module.exports = db.defineModel('my_find_good',{
    my_id: {
        type: db.BIGINT(12),
        primaryKey: true,
        allowNull: false
    },
    good_id: {
        type: db.BIGINT(12),
        references: {
            model: 'find_good',
            key: 'good_id'
        }
    }
});