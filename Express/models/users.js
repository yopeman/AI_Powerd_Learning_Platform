import { sequelize, DataTypes } from './config.js';

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
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
        validate: {
            isEmail: true,
        },
    },
    phone: {
        type: DataTypes.STRING(21),
        set(value) {
            const cleaned = value.replace(/[^\d+]/g, '');
            if (cleaned.startsWith('+0')) {
                this.setDataValue('phone', '+' + cleaned.slice(2));
            } else {
                this.setDataValue('phone', cleaned);
            }
        },
        validate: {
            isValidPhone(value) {
                const normalized = value.replace(/[^\d+]/g, '');
                const intlRegex = /^\+\d{8,15}$/;
                const localRegex = /^\d{7,15}$/;

                if (!intlRegex.test(normalized) && !localRegex.test(normalized)) {
                    throw new Error('Invalid phone format. Use international (+XXX...) or local (XXX...) format');
                }

                if (normalized.startsWith('+')) {
                    const validCodes = ['1', '44', '33', '81', '86', '91']; // Add more as needed
                    const countryCode = normalized.slice(1, 3);
                    
                    if (!validCodes.some(code => normalized.startsWith('+' + code))) {
                        throw new Error('Unsupported country code');
                    }
                }
            },
        },
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'student', 'assistant'),
        allowNull: false,
        defaultValue: 'student',
    },
}, { 
    timestamps: true,
    tableName: 'Users',
});

export default Users;