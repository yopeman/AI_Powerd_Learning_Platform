import { sequelize, DataTypes, uuidv7 } from './config.js';

const Subscriptions = sequelize.define('Subscriptions', {
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
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active'
    },
    learned_topic_numbers: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, { 
    timestamps: true,
    underscored: true,
    tableName: 'Subscriptions'
});

Subscriptions.sync().then().catch();
export default Subscriptions;