const Book = require('../models/book');

class BookRepository {

    constructor() {}

    getAll = async () => {
        const filter = {};
        return await Book.find(filter).exec();
    }
    
    getOne = async (filterParams) => {
        const filter = {};
        if (filterParams.id != null) {
            filter['_id'] = filterParams.id;
        }
    
        return await Book.findOne(filter).exec();
    }
    
    deleteById = async (id) => {
        return await Book.deleteOne({'_id': id});
    }
    
    create = async (book) => {
        return await new Book(book).save();
    }
    
    update = async (bookToUpdate) => {
        return await Book.findByIdAndUpdate(bookToUpdate._id, bookToUpdate, { new: true, runValidators: true }).exec();
    }
}

module.exports = BookRepository;