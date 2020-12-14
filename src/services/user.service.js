const UserRepository = require('../repository/user.repository');

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

    deleteById = async (id) => {
        return await this.userRepository.deleteById(id);
    }

    create = async (user) => {
        return await this.userRepository.create(user);
    }

    update = async (userToUpdate) => {
        return await this.userRepository.update(userToUpdate);
    }

}

module.exports = UserService;