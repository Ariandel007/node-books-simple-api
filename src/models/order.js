const mongoose = require('mongoose');
const { states } = require('../utils/constants');

const orderSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            required: true,
            default: states.PENDING
        },
        details: [
            {
                quantity: {
                    type: Number,
                    validate(value) {
                        if (value < 0) {
                            throw new Error('La cantidad no puede ser menor a 1');
                        }

                        if (!Number.isInteger(value)) {
                            throw new Error('La cantidad debe ser entera');
                        }
                    }
                },
                book: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Book'
                }

            }
        ],
        client: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;