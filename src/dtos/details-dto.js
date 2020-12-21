const mongoose = require('mongoose');

class DetailsDTO {
    constructor(detailsDTO) {
        if (detailsDTO.quantity != null) {
            this.quantity = detailsDTO.quantity;
        }

        if (detailsDTO.book != null) {
            this.book = new mongoose.Types.ObjectId(detailsDTO.book);// es un id string convertido a un ObjectId
        }
    }
}

module.exports = DetailsDTO;