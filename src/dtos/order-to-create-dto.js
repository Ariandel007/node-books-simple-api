const DetailsDTO = require('./details-dto');
const mongoose = require('mongoose');

class OrderToCreateDTO {
    constructor(orderToCreate) {
        if (Array.isArray(orderToCreate.details)) {
            this.details = orderToCreate.details.map(x => new DetailsDTO(x));
        }

        if (orderToCreate.client) {
            this.client = new mongoose.Types.ObjectId(orderToCreate.client);// es un id string convertido a un ObjectId
        }

    }
}

module.exports = OrderToCreateDTO;