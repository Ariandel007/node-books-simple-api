const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const UserRepository = require('../src/repository/user.repository');
const userRepository = new UserRepository();
const { userOneId, userOneToInit, setupDataBase } = require('./fixtures/db');

let tokenuserToInit = '';

beforeEach(setupDataBase);

test('Should signup a new user', async () => {
    const response = await request(app).post('/api-books/v1/users').send({
        firstName: 'Trixie-Test',
        lastName: 'Test',
        email: 'trixie@gmail.com',
        password: 'peluso123@',
        age: 19,
        address: 'Calle la Comprension 7876'
    }).expect(201);

    // Asercion que verifica que el cambio se efectuo en la base de datos
    const user = await User.findById(response.body._id);
    expect(user).not.toBeNull();

    // Asercion acerca del cuerpo de la respuesta
    expect(response.body).toMatchObject(
        {
            firstName: 'Trixie-Test',
            lastName: 'Test',
            email: 'trixie@gmail.com',
            age: 19,
            address: 'Calle la Comprension 7876'
        }
    );

    // verificar que el password en la base de datos no sea el texto plano ingresado
    expect(user.password).not.toBe('peluso123@');
});


test('Should login an existing user', async () => {
    const response = await request(app).post('/api-books/v1/users/login').send({
        email: userOneToInit.email,
        password: userOneToInit.password
    }).expect(201);

    const user = await userRepository.getOne({id: response.body.user._id});
    expect(user.email).toBe(userOneToInit.email.toLowerCase());
    // guardamos el token para usarlos en futuros pruebas con el request
    tokenuserToInit = response.body.token;
});

test('User can see his order', async() => {
    console.log(tokenuserToInit);
});