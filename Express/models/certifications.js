import { sequelize, DataTypes } from './config.js';

const Certifications = sequelize.define('Certifications', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
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
        type: DataTypes.TEXT,
        unique: true
    }
}, { 
    timestamps: true,
    underscored: true,
    tableName: 'Certifications'
});

(async () => {
    await Certifications.sync();
})();

export default Certifications;