const User = require('../models/user');

class UserRepository {

    constructor() {}

    getAll = async () => {
        const filter = {};
        return await User.find(filter).exec();
    }
    
    getOne = async (filterParams) => {
        const filter = {};
        if (filterParams.id != null) {
            filter['_id'] = filterParams.id;
        }

        if (filterParams.email != null) {
            filter['email'] = filterParams.email;
        }
    
        return await User.findOne(filter).exec();
    }
    
    deleteById = async (id) => {
        return await User.deleteOne({'_id': id});
    }
    
    create = async (user) => {
        return await new User(user).save();
    }
    
    update = async (userToUpdate) => {
        return await User.findByIdAndUpdate(userToUpdate._id, userToUpdate, { new: true, runValidators: true }).exec();
    }
}

module.exports = UserRepository;