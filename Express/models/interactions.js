import { sequelize, DataTypes } from './config.js';

const Interactions = sequelize.define('Interactions', {
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
    topicId: {
        type: DataTypes.UUID,
        references: {
            model: 'Topics',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    question: {
        type: DataTypes.TEXT,
    },
    response_file_path: {
        type: DataTypes.TEXT,
        unique: true
    }
}, { 
    timestamps: true,
    underscored: true,
    tableName: 'Interactions',
    uniqueKeys: {
        unq: {
            fields: ['userId', 'topicId', 'question']
        }
    }
});

(async () => {
    await Interactions.sync();
})();

export default Interactions;