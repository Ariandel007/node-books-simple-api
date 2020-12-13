const Order = require('../models/order');

getAll = () => {
    const filter = {};
    return await Order.find(filter).exec();
}

getOne = (filterParams) => {
    const filter = {};
    if (filterParams.id != null) {
        filter['_id'] = filterParams.id;
    }

    return await Order.findOne(filter).exec();
}

deleteById = (id) => {
    return await Order.deleteOne({'_id': id});
}

create = (order) => {
    return await new Order(order).save();
}

update = (orderToUpdate) => {
    return await Order.findByIdAndUpdate(orderToUpdate._id, orderToUpdate, { new: true, runValidators: true }).exec();
}