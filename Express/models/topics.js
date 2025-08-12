import { sequelize, DataTypes } from './config.js';

const Topics = sequelize.define('Topics', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    content_file_path: {
        type: DataTypes.TEXT
    },
    chapterId: {
        type: DataTypes.UUID,
        references: {
            model: 'Chapters',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, { 
    timestamps: true,
    tableName: 'Topics',
    uniqueKeys: {
        unq: {
            fields: ['title', 'chapterId']
        }
    }
});

export default Topics;