import { sequelize, DataTypes } from './config.js';

const Chapters = sequelize.define('Chapters', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
    },
    courseId: {
        type: DataTypes.UUID,
        references: {
            model: 'Courses',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    tableName: 'Chapters',
    uniqueKeys: {
        unq: {
            fields: ['courseId', 'title']
        },
        unq2: {
            fields: ['courseId', 'order']
        }
    }
});

export default Chapters;