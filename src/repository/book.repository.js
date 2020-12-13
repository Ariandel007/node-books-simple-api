const Book = require('../models/book');

getAll = () => {
    const filter = {};
    return await Book.find(filter).exec();
}

getOne = (filterParams) => {
    const filter = {};
    if (filterParams.id != null) {
        filter['_id'] = filterParams.id;
    }

    return await Book.findOne(filter).exec();
}

deleteById = (id) => {
    return await Book.deleteOne({'_id': id});
}

create = (book) => {
    return await new Book(book).save();
}

update = (bookToUpdate) => {
    return await Book.findByIdAndUpdate(bookToUpdate._id, bookToUpdate, { new: true, runValidators: true }).exec();
}