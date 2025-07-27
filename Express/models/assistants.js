import { sequelize, DataTypes, uuidv7 } from './config.js';

const Assistants = sequelize.define('Assistants', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv7(),
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'Users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    fieldId: {
        type: DataTypes.UUID,
        references: {
            model: 'Fields',
            key: 'id'
        },
        unique: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, { 
    timestamps: true,
    underscored: true,
    tableName: 'Assistants'
});

Assistants.sync().then().catch();
export default Assistants;