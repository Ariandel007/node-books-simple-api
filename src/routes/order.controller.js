const express = require('express');
const { authUsers, authAdmins } = require('../middleware/auth.middleware');
const OrderService = require('../services/order.service');
const orderServices = new OrderService();
const router = new express.Router();
const QueryStringListOrdersDto = require('../dtos/query-string-list-orders-dto');
const OrderToCreateDTO = require('../dtos/order-to-create-dto');


// Este es para los administradores para que vean las ordenes de todos los usuarios
router.get('/api-books/v1/orders', authAdmins ,async (req, res, next) => {
    try {
        const queryOrders = new QueryStringListOrdersDto(req.query);
        const orders = await orderServices.getAllOrders(queryOrders);
        return res.status(200).send(orders);
    } catch(error) {
        next(error);
    }
});

router.post('/api-books/v1/orders', authUsers ,async (req, res, next) => {
    try {
        req.body.client = req.decodedToken._id;
        const orderToCreateDTO = new OrderToCreateDTO(req.body);
        
        if (orderToCreateDTO.details.length > 10) {
            throw new Error('El numero maximo de libros individuales por orden es de 10');
        }

        const orderCreated = await orderServices.makeOrder(orderToCreateDTO);
        return res.status(201).send(orderCreated);
    } catch(error) {
        next(error);
    }
});

module.exports = router;