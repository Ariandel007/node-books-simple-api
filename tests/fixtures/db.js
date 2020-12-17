const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');

const userOneId = new mongoose.Types.ObjectId();

const userOneToInit = {
    _id: userOneId,
    firstName: 'Alex-Test',
    lastName: 'Urbina-Test',
    email: 'alexTest@gmail.com',
    password: 'peluso123@',
    age: 21,
    address: 'Calle la Comprension 7876'
};



const setupDataBase = async () => {
    await User.deleteMany();

    await new User(userOneToInit).save();
}

module.exports = {
    userOneId,
    userOneToInit,
    setupDataBase
}