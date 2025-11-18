
class User {
    constructor(name, age) {
        this.name = name;
        this.age = parseInt(age);
    }

    getLabel() {
        return `${this.name} (${this.age} jaar)`;
    }
}

export default User;