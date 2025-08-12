import { sequelize, DataTypes } from './config.js';

const Payments = sequelize.define('Payments', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
    },
    subscriptionId: {
        type: DataTypes.UUID,
        references: {
            model: 'Subscriptions',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    method: {
        type: DataTypes.STRING(50),
    },
    year: {
        type: DataTypes.INTEGER,
    },
    semester: {
        type: DataTypes.INTEGER,
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
    receipt_url: {
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

(async () => {
    await Payments.sync();
})();

export default Payments;