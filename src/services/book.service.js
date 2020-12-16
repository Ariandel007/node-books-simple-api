const BookRepository = require('../repository/book.repository');

class BookService {

    constructor () {
        this.bookRepository = new BookRepository();
    }

    getAllBooks = async (queryBooks) => {
        return await this.bookRepository.getAll(queryBooks);
    }

    getOneBook = async (filterParams) => {
        return await this.bookRepository.getOne(filterParams);
    }

    deleteById = async (id) => {
        return await this.bookRepository.deleteById(id);
    }

    create = async (book) => {
        return await this.bookRepository.create(book);
    }

    update = async (bookToUpdate) => {
        return await this.bookRepository.update(bookToUpdate);
    }

}

module.exports = BookService;