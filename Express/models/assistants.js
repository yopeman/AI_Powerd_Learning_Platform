import { sequelize, DataTypes } from './config.js';

const Assistants = sequelize.define('Assistants', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
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

(async () => {
    await Assistants.sync();
})();

export default Assistants;