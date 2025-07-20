import { sequelize, DataTypes, uuidv4 } from './config.js';

const Assistants = sequelize.define('Assistants', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'Users',
            key: 'id'
        },
    },
    fieldId: {
        type: DataTypes.UUID,
        references: {
            model: 'Fields',
            key: 'id'
        },
        unique: true
    }
}, { 
    timestamps: true,
    underscored: true,
    tableName: 'Assistants'
});

Assistants.sync().then().catch();
export default Assistants;