const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        isbn: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publisher: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
            validate(value) {
                if (!Number.isInteger(value)) {
                    throw new Error('El stock debe ser entero');
                }
            }
        },
        image: {
            type: Buffer
        }
    },
    {
        timestamps: true
    }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;