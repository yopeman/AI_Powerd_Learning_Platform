import { sequelize, DataTypes, uuidv4 } from './config.js';

const Assistants = sequelize.define('Assistants', {
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'Users',
            key: 'id'
        },
        primaryKey: true,
    },
    fieldId: {
        type: DataTypes.UUID,
        references: {
            model: 'Fields',
            key: 'id'
        },
        primaryKey: true,
    }
}, { 
    timestamps: true,
    underscored: true,
    tableName: 'assistants'
});

Assistants.sync().then().catch();
export default Assistants;