const User = require('../models/user');

getAll = () => {
    const filter = {};
    return await User.find(filter).exec();
}

getOne = (filterParams) => {
    const filter = {};
    if (filterParams.id != null) {
        filter['_id'] = filterParams.id;
    }

    return await User.findOne(filter).exec();
}

deleteById = (id) => {
    return await User.deleteOne({'_id': id});
}

create = (user) => {
    return await new User(user).save();
}

update = (userToUpdate) => {
    return await User.findByIdAndUpdate(userToUpdate._id, userToUpdate, { new: true, runValidators: true }).exec();
}