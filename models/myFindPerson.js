const db = require('../db');

module.exports = db.defineModel('my_find_person',{
    my_id: {
        type: db.STRING(64),
        primaryKey: true,
        allowNull: false
    },
    good_id: {
        type: db.STRING(64),
        references: {
            model: find_person,
            key: good_id
        }
    }
});