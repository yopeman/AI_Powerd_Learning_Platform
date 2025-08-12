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
    underscored: true,
    tableName: 'Amounts',
});

(async () => {
    await Amounts.sync();
    const amount = await Amounts.findOne();
    if (!amount) {
        await Amounts.create({ amount: 200.0 });
    }
})();

export default Amounts;