import { sequelize, DataTypes } from './config.js';

const Amounts = sequelize.define('Amounts', {
    id: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        primaryKey: true
    },
    amount: {
        type: DataTypes.FLOAT,
        defaultValue: 200.0,
        allowNull: false,
        unique: true
    },
}, {
    timestamps: true,
    tableName: 'Amounts',
});

export default Amounts;