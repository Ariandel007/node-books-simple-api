class UserToUpdateDTO {
    constructor(userToUpdate) {

        if (userToUpdate.firstName != null) {
            this.firstName = userToUpdate.firstName;
        }

        if (userToUpdate.lastName != null) {
            this.lastName = userToUpdate.lastName;
        }

        if (userToUpdate.email != null) {
            this.email = userToUpdate.email;
        }

        if (userToUpdate.password != null) {
            this.password = userToUpdate.password;
        }

        if (userToUpdate.age != null) {
            this.age = userToUpdate.age;
        }

        if (userToUpdate.address != null) {
            this.address = userToUpdate.address;
        }

    }
}

module.exports = UserToUpdateDTO;