const Order = require('../models/order');
const Book = require('../models/book');
const mongoose = require('mongoose');

class OrderRepository {

    constructor() {}

    getAll = async (queryOrders) => {
        const filter = {};

        const sort = {};
        sort[queryOrders.sortBy] = queryOrders.typeSorting;

        return await Order.find(filter)
        .sort(sort).skip(queryOrders.skip).limit(queryOrders.limit)
        .populate({ path: 'details.book' }).populate({ path: 'client' })
        .exec();
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
    
    // create = async (order) => {
    //     return await new Order(order).save();
    // }
    
    update = async (orderToUpdate) => {
        return await Order.findByIdAndUpdate(orderToUpdate._id, orderToUpdate, { new: true, runValidators: true }).exec();
    }

    makeOrder = async (order) => {
        // Iniciar sesion
        const session = await mongoose.startSession();
        try {
            // Iniciar transaccion
            session.startTransaction();

            const newOrder = await new Order(order).save();

            for (const element of order.details) {
                const bookSelected = await Book.findById(element.book.toString()).exec();
                if (bookSelected == null) {
                    throw new Error('Una de la ordenes seleccionadas no existe');
                }
                bookSelected.stock = bookSelected.stock - element.quantity;
                await bookSelected.save();
            }
            
            // finalizar y terminar la sesion
            await session.commitTransaction();
            session.endSession();

            return newOrder;
        } catch (error) {
            // Abortar transaccion y finalizar sesion
            await session.abortTransaction();
            session.endSession();
            throw new Error('Error en transaccion');
        }
    }
}

module.exports = OrderRepository;