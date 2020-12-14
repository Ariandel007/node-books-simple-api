const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
//const Order = require('./order');

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

userSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'client'
});

userSchema.pre('save', async function(next){
    const user = this;
    
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

// Lo siguiente es si quisieramos hacer eliminacion en cascada, aunque este no es el caso
// userSchema.pre('remove', async function(next) {
//     const user = this;
//     await Order.deleteMany({ client: user._id});
// });

const User = mongoose.model('User', userSchema);

module.exports = User;