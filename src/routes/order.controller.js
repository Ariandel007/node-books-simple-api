const { authUsers } = require('../middleware/auth.middleware');
const OrderService = require('../services/order.service');
const orderServices = new OrderService();
const router = new express.Router();
const QueryStringListOrdersDto = require('../dtos/query-string-list-orders-dto');
const OrderToCreateDTO = require('../dtos/order-to-create-dto');

router.get('/api-books/v1/orders', authUsers ,async (req, res, next) => {
    try {
        // falta validacion de filtrado de que usuario esta viendo las ordenes
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
        const orderCreated = await orderServices.create(orderToCreateDTO);
        return res.status(201).send(orderCreated);
    } catch(error) {
        next(error);
    }
});

