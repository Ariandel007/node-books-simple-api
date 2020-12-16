const express = require('express');
const router = new express.Router();
const UserService = require('../services/user.service');
const userServices = new UserService();
const UserToUpdateDTO = require('../dtos/user-to-update-dto');
const UserToCreateDTO = require('../dtos/user-to-create-dto');

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
        return res.status(201).send({user: user, token: token});
    } catch (error) {
        next(error);
    }
});

router.get('/api-books/v1/users/my-orders', async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
});

module.exports = router;