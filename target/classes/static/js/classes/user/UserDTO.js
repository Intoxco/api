export default class UserDTO {
    #username;
    #password;
    #name;
    #email;
    #phone;
    #experience;
    #education;

    constructor(username,password,name,email,phone,experience,education){
        this.#username=username;
        this.#password=password;
        this.#name = name;
        this.#email = email;
        this.#phone = phone;
        this.#experience = experience;
        this.#education = education;
    }
    toUpdateJSON(){
        const data ={
            username: this.#username,
            password: this.#password,
            name: this.#name,
            email:this.#email,
            phone:this.#phone,
            experience:this.#experience,
            education:this.#education
        };
        return Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== undefined && value !== null)
        );
    }
    toJSON() {
        const data ={
            username: this.#username,
            password: this.#password,
            name: this.#name,
            email:this.#email,
            phone:this.#phone,
            experience:this.#experience,
            education:this.#education
        };
        return Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== undefined && value !== null && value !== "")
        );
    }
}