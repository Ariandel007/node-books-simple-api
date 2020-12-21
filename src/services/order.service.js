const OrderRepository = require('../repository/order.repository');

class OrderService {

    constructor () {
        this.orderRepository = new OrderRepository();
    }

    getAllOrders = async (queryOrders) => {
        return await this.orderRepository.getAll(queryOrders);
    }

    getOneOrder = async (filterParams) => {
        return await this.orderRepository.getOne(filterParams);
    }

    deleteById = async (id) => {
        return await this.orderRepository.deleteById(id);
    }

    // create = async (order) => {
    //     return await this.orderRepository.create(order);
    // }

    update = async (orderToUpdate) => {
        return await this.orderRepository.update(orderToUpdate);
    }

    makeOrder = async (order) => {
        return await this.orderRepository.makeOrder(order);
    }

}

module.exports = OrderService;