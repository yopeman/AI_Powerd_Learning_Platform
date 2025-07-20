import { sequelize, DataTypes, uuidv4 } from './config.js';

const Chapters = sequelize.define('Chapters', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        primaryKey: true,
    },
    courseId: {
        type: DataTypes.UUID,
        references: {
            model: 'Courses',
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    order: {
        type: DataTypes.INTEGER,
    }
}, { 
    timestamps: true,
    underscored: true,
    tableName: 'Chapters'
});

Chapters.sync().then().catch();
export default Chapters;