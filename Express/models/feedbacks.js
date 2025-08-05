import { sequelize, DataTypes, uuidv7 } from './config.js';

const Feedbacks = sequelize.define('Feedbacks', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv7(), // Use a function to ensure a new UUID on instance creation
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
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: {
            min: 0,
            max: 5
        }
    }
}, {
    timestamps: true,
    underscored: true,
    tableName: 'Feedbacks'
});

Feedbacks.sync().then().catch();
export default Feedbacks;