import { sequelize, DataTypes, uuidv7 } from './config.js';

const Results = sequelize.define('Results', {
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
    certificationId: {
        type: DataTypes.UUID,
        references: {
            model: 'Certifications',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    value: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
}, { 
    timestamps: true,
    underscored: true,
    tableName: 'Results'
});

Results.sync().then().catch();
export default Results;