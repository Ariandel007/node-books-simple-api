class UserToCreateDTO {
    constructor(userToCreate) {
        if (userToCreate._id != null) {
            this._id = userToCreate._id;
        }

        if (userToCreate.firstName != null) {
            this.firstName = userToCreate.firstName;
        }

        if (userToCreate.lastName != null) {
            this.lastName = userToCreate.lastName;
        }

        if (userToCreate.email != null) {
            this.email = userToCreate.email;
        }

        if (userToCreate.password != null) {
            this.password = userToCreate.password;
        }

        if (userToCreate.age != null) {
            this.age = userToCreate.age;
        }

        if (userToCreate.address != null) {
            this.address = userToCreate.address;
        }

    }
}

module.exports = UserToCreateDTO;