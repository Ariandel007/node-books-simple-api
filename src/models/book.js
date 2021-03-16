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
        price: {
            type: Number,
            required: true,
            default: 0,
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

bookSchema.methods.toJSON = function () { // ya que el unico modo en que se piensa enviar al imagen es como una imagen y no como json agregaremos esto
    const book = this;
    const bookObject = book.toObject();

    delete bookObject.image;

    return bookObject;
}

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;