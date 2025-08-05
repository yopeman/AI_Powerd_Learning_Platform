import { sequelize, DataTypes, uuidv7 } from './config.js';

const Amounts = sequelize.define('Amounts', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv7(), // Use a function to ensure a new UUID on instance creation
        primaryKey: true,
    },
    amount: {
        type: DataTypes.FLOAT,
        defaultValue: 200.0,
        allowNull: false,
    },
}, {
    timestamps: true,
    underscored: true,
    tableName: 'Amounts',
});

// Sync the model with the database
const syncAmounts = async () => {
    await Amounts.sync();
};

// Check if any records exist and create a default one if not
const initializeAmounts = async () => {
    const amount = await Amounts.findOne();
    if (!amount) {
        await Amounts.create({ amount: 200.0 });
    }
};

// Initialize the model
const initialize = async () => {
    await syncAmounts();
    await initializeAmounts();
};
initialize();

export default Amounts;