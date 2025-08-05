import { sequelize, DataTypes, uuidv7 } from './config.js';

const Certifications = sequelize.define('Certifications', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv7(),
        primaryKey: true,
    },
    fieldId: {
        type: DataTypes.UUID,
        references: {
            model: 'Fields',
            key: 'id'
        },
        unique: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    questions_file_path: {
        type: DataTypes.STRING(5000),
    }
}, { 
    timestamps: true,
    underscored: true,
    tableName: 'Certifications'
});

Certifications.sync().then().catch();
export default Certifications;