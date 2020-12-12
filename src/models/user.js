const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email no valido!');
                }
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            trim: true,
        },
        age: {
            type: Number,
            required: true,
            validate(value) {
                if (value < 18) {
                    throw new Error('La edad no puede ser un numero menor a 18');
                }

                if (!Number.isInteger(value)) {
                    throw new Error('La edad debe ser un entero');
                }
            }
        },
        address: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;