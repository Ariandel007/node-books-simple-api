const express = require('express');
const router = new express.Router();
const { authUsers } = require('../middleware/auth.middleware');
const UserService = require('../services/user.service');
const userServices = new UserService();
const UserToUpdateDTO = require('../dtos/user-to-update-dto');
const UserToCreateDTO = require('../dtos/user-to-create-dto');
const UserLogedDTO = require('../dtos/user-loged-dto');
const QueryStringListOrdersDto = require('../dtos/query-string-list-orders-dto');

router.post('/api-books/v1/users', async (req, res, next) => {
    try {
        const newUser = req.body;
        const userToCreateDTO = new UserToCreateDTO(newUser);
        const userCreated = await userServices.create(userToCreateDTO);
        return res.status(201).send(userCreated);

    } catch (error) {
        next(error);
    }
});

router.post('/api-books/v1/users/login', async (req, res, next) => {
    try {
        const userToLogin = req.body;
        const user = await userServices.login(userToLogin);
        const token = await userServices.generateAuthToken(user);
        return res.status(201).send({user: new UserLogedDTO(user), token: token});
    } catch (error) {
        next(error);
    }
});


// este servicio hace lo mismo que el getOrders, solo que usa los populates de otro modo, se usan los dos por fines de aprendizaje
router.get('/api-books/v1/users/my-orders', authUsers, async (req, res, next) => {
    try {
        const idUser = req.decodedToken._id;

        const filterParams = {
            id: idUser
        }

        const queryOrders = new QueryStringListOrdersDto(req.query);

        const myOrders = await userServices.getOrdersOfUser(filterParams, queryOrders);
        
        return res.status(200).send(myOrders);
    } catch (error) {
        next(error);
    }
});

router.get('/api-books/v1/users/my-profile', authUsers, async (req, res, next) => {
    try {
        const idUser = req.decodedToken._id;
        const filterParams = {
            _id: idUser
        }
        const currentUser = await userServices.getOneUser(filterParams);
        const currentUserDTO = new UserLogedDTO(currentUser);

        return res.status(200).send(currentUserDTO);
    } catch (error) {
        next(error);
    }
});

router.patch('/api-books/v1/users/update-my-profile', authUsers, async (req, res, next) => {
    try {
        const idUser = req.decodedToken._id;
        const userToUpdate = new UserToUpdateDTO(req.body);

        if (idUser !== userToUpdate._id) {
            throw new Error('Usted no puede actualizar este usuario');
        }

        const userUpdated = await userServices.update(userToUpdate);

        return res.status(200).send(userUpdated);
    } catch (error) {
        next(error);
    }
});



module.exports = router; 