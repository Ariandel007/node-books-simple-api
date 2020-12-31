const UserRepository = require('../repository/user.repository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {

    constructor() {
        this.userRepository = new UserRepository();
    }

    getAllUsers = async () => {
        return await this.userRepository.getAll();
    }

    getOneUser = async (filterParams) => {
        return await this.userRepository.getOne(filterParams);
    }

    getOrdersOfUser = async (filterParams, queryOrders) => {
        const currentUser = await this.userRepository.getOne(filterParams);

        const sort = {};
        sort[queryOrders.sortBy] = queryOrders.typeSorting;

        // este populate llenara la propiedad virtual orders
        await currentUser.populate({
            path: 'orders',
            //match: {},
            options: {
                limit: queryOrders.limit,
                skip: queryOrders.skip,
                sort: sort,
                populate: [{
                    path: 'details.book',
                    select: { '_id': 1,'isbn':1, 'title':1, 'author':1, 'publisher': 1},
                },
                {
                    path: 'client',
                    select: { '_id': 1,'firstName':1, 'lastName':1, 'email':1, 'address': 1},
                }
                ]
            }
        }).execPopulate();

        return currentUser.orders;
    }

    deleteById = async (id) => {
        return await this.userRepository.deleteById(id);
    }

    create = async (user) => {
        return await this.userRepository.create(user);
    }

    update = async (userToUpdate) => {
        return await this.userRepository.update(userToUpdate);
    }

    login = async (userToLogin) => {
        const filter = {
            email: userToLogin.email
        };

        const user = await this.getOneUser(filter);

        if (!user) {
            throw new Error('No existe usuario con ese email');
        }

        const isMatchPassword = await bcrypt.compare(userToLogin.password, user.password);

        if (!isMatchPassword) {
            throw new Error('La contraseña no es la correcta');
        }

        return user;
    }

    generateAuthToken = async (user) => {
        const token = jwt.sign({_id: user._id.toString(), email: user.email, rol: user.rol}, process.env.JWT_SECRET, { expiresIn: 300 });
        return token;
    }

}

module.exports = UserService;