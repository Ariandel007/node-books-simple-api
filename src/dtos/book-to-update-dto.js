class BookToUpdateDTO {
    constructor(bookToUpdate) {
        if (bookToUpdate.isbn != null) {
            this.isbn = bookToUpdate.isbn;
        }

        if (bookToUpdate.title != null) {
            this.title = bookToUpdate.title;
        }

        if (bookToUpdate.author != null) {
            this.author = bookToUpdate.author;
        }

        if (bookToUpdate.publisher != null) {
            this.publisher = bookToUpdate.publisher;
        }

        if (bookToUpdate.category != null) {
            this.category = bookToUpdate.category;
        }

        if (bookToUpdate.stock != null) {
            this.stock = bookToUpdate.stock;
        }
    }
}

module.exports = BookToUpdateDTO;