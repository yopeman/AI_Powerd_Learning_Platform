import { sequelize, DataTypes } from './config.js';

const Courses = sequelize.define('Courses', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
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
        validate: {
            min: 1,
            max: 10
        }
    },
    semester: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5
        }
    },
    chapters_length: {
        type: DataTypes.INTEGER,
    }
}, { 
    timestamps: true,
    underscored: true,
    tableName: 'Courses',
    uniqueKeys: {
        unq: {
            fields: ['title', 'fieldId']
        },
        unq2: {
            fields: ['fieldId', 'year', 'semester']
        }
    }
});

(async () => {
    await Courses.sync();
})();

export default Courses;