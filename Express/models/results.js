import { sequelize, DataTypes } from './config.js';

const Results = sequelize.define('Results', {
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
    tableName: 'Results',
    uniqueKeys: {
        unq: {
            fields: ['userId', 'certificationId']
        }
    }
});

export default Results;