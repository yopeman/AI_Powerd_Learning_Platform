import { sequelize, DataTypes, uuidv4 } from './config.js';

const Subscriptions = sequelize.define('Subscriptions', {
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
        }
    },
    fieldId: {
        type: DataTypes.UUID,
        references: {
            model: 'Fields',
            key: 'id'
        }
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