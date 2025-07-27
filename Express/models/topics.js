import { sequelize, DataTypes, uuidv7 } from './config.js';

const Topics = sequelize.define('Topics', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv7(),
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    content_file_path: {
        type: DataTypes.STRING(5000),
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
    underscored: true,
    tableName: 'Topics'
});

Topics.sync().then().catch();
export default Topics;