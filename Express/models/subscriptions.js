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
    },
    learned_topic_numbers: {
        type: DataTypes.INTEGER,
    }
}, { 
    timestamps: true,
    underscored: true,
    tableName: 'subscriptions'
});

Subscriptions.sync().then().catch();
export default Subscriptions;