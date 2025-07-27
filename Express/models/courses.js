import { sequelize, DataTypes, uuidv7 } from './config.js';

const Courses = sequelize.define('Courses', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv7(),
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    fieldId: {
        type: DataTypes.UUID,
        references: {
            model: 'Fields',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    year: {
        type: DataTypes.INTEGER,
    },
    semester: {
        type: DataTypes.INTEGER,
    },
    chapters_length: {
        type: DataTypes.INTEGER,
    }
}, { 
    timestamps: true,
    underscored: true,
    tableName: 'Courses'
});

Courses.sync().then().catch();
export default Courses;