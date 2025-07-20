import { sequelize, DataTypes, uuidv4 } from './config.js';

const Payments = sequelize.define('Payments', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        primaryKey: true,
    },
    subscriptionId: {
        type: DataTypes.UUID,
        references: {
            model: 'Subscriptions',
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    method: {
        type: DataTypes.STRING(50),
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        allowNull: false,
        defaultValue: 'pending'
    },
    checkout_url: {
        type: DataTypes.STRING(),
        validate: {
            isUrl: true
        }
    },
    recipt_url: {
        type: DataTypes.STRING(),
        validate: {
            isUrl: true
        }
    },
    transactionId: {
        type: DataTypes.STRING(255),
    }
}, { 
    timestamps: true,
    underscored: true,
    tableName: 'Payments'
});

Payments.sync().then().catch();
export default Payments;