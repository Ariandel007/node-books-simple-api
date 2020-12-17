class UserLogedDTO {
    constructor(userLogedDto) {
        if (userLogedDto._id != null) {
            this._id = userLogedDto._id;
        }

        if (userLogedDto.firstName != null) {
            this.firstName = userLogedDto.firstName;
        }

        if (userLogedDto.lastName != null) {
            this.lastName = userLogedDto.lastName;
        }

        if (userLogedDto.email != null) {
            this.email = userLogedDto.email;
        }

        if (userLogedDto.age != null) {
            this.age = userLogedDto.age;
        }

        if (userLogedDto.address != null) {
            this.address = userLogedDto.address;
        }

        if (userLogedDto.rol != null) {
            this.rol = userLogedDto.rol;
        }
    }
}

module.exports = UserLogedDTO;