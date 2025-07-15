import { sequelize, DataTypes, uuidv4 } from './config.js';

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
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
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'student', 'assistant'),
        allowNull: false,
    }
}, { 
    timestamps: true,
    underscored: true,
    tableName: 'users'
});

Users.sync().then().catch();
export default Users;