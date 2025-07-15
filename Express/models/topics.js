import { sequelize, DataTypes, uuidv4 } from './config.js';

const Topics = sequelize.define('Topics', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    content_file_path: {
        type: DataTypes.STRING(255),
    },
    chapterId: {
        type: DataTypes.UUID,
        references: {
            model: 'Chapters',
            key: 'id'
        }
    }
}, { 
    timestamps: true,
    underscored: true,
    tableName: 'topics'
});

Topics.sync().then().catch();
export default Topics;