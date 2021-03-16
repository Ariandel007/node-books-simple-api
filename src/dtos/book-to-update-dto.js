class BookToUpdateDTO {
    constructor(bookToUpdate) {
        if (bookToUpdate._id != null) {
            this._id = bookToUpdate._id;
        }

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

        if (bookToUpdate.image != null) {
            this.image = bookToUpdate.image;
        }

        if (bookToUpdate.price != null) {
            this.price = bookToUpdate.price;
        }
    }
}

module.exports = BookToUpdateDTO;