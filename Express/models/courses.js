import { sequelize, DataTypes, uuidv4 } from './config.js';

const Courses = sequelize.define('Courses', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
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
        }
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