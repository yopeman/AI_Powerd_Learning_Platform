import { sequelize, DataTypes, uuidv7 } from './config.js';

const Fields = sequelize.define('Fields', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv7(),
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
    },
    years_length: {
        type: DataTypes.INTEGER,
    },
    isFree: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    number_of_free_topics: {
        type: DataTypes.INTEGER,
    }
}, { 
    timestamps: true,
    underscored: true,
    tableName: 'Fields'
});

Fields.sync().then().catch();
export default Fields;