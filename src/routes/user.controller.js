const express = require('express');
const router = new express.Router();
const { authUsers } = require('../middleware/auth.middleware');
const UserService = require('../services/user.service');
const userServices = new UserService();
const UserToUpdateDTO = require('../dtos/user-to-update-dto');
const UserToCreateDTO = require('../dtos/user-to-create-dto');
const UserLogedDTO = require('../dtos/user-loged-dto');

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

router.get('/api-books/v1/users/my-orders', authUsers, async (req, res, next) => {
    try {
        return res.status(201).send({message: 'TEST'});
    } catch (error) {
        next(error);
    }
});

module.exports = router;