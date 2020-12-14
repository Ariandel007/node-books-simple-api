const Order = require('../models/order');

class OrderRepository {

    constructor() {}

    getAll = async () => {
        const filter = {};
        return await Order.find(filter).exec();
    }
    
    getOne = async (filterParams) => {
        const filter = {};
        if (filterParams.id != null) {
            filter['_id'] = filterParams.id;
        }
    
        return await Order.findOne(filter).exec();
    }
    
    deleteById = async (id) => {
        return await Order.deleteOne({'_id': id});
    }
    
    create = async (order) => {
        return await new Order(order).save();
    }
    
    update = async (orderToUpdate) => {
        return await Order.findByIdAndUpdate(orderToUpdate._id, orderToUpdate, { new: true, runValidators: true }).exec();
    }
}

module.exports = OrderRepository;