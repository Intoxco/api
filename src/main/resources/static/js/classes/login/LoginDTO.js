export default class LoginDTO{
    #username;
    #password;

    constructor(username,password){
        this.#username=username;
        this.#password=password;
    }
    toJSON() {
        return {
            username: this.#username,
            password: this.#password
        };
    }
}