import { sequelize, DataTypes, uuidv7 } from './config.js';

const Interactions = sequelize.define('Interactions', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv7(),
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'Users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    topicId: {
        type: DataTypes.UUID,
        references: {
            model: 'Topics',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    questions: {
        type: DataTypes.TEXT,
    },
    response_file_path: {
        type: DataTypes.STRING(5000),
    }
}, { 
    timestamps: true,
    underscored: true,
    tableName: 'Interactions'
});

Interactions.sync().then().catch();
export default Interactions;