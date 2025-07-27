import { sequelize, DataTypes, uuidv7 } from './config.js';

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv7(),
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(20),
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'student', 'assistant'),
        allowNull: false,
        defaultValue: 'student'
    }
}, { 
    timestamps: true,
    underscored: true,
    tableName: 'Users'
});

Users.sync().then().catch();
export default Users;