export default class CompanyDTO {
    #username;
    #password;
    #name;
    #email;
    #phone;
    #business;
    #street;
    #number;
    #city;
    #state;
    constructor(username,password,name,email,phone,business,street,number,city,state){
        this.#username=username;
        this.#password=password;
        this.#name = name;
        this.#email = email;
        this.#phone = phone;
        this.#business=business;
        this.#street =street;
        this.#number = number;
        this.#city = city;
        this.#state = state;
    }
    toUpdateJSON(){
        const data ={
            username: this.#username,
            password: this.#password,
            name: this.#name,
            email:this.#email,
            phone:this.#phone,
            business:this.#business,
            street:this.#street,
            number:this.#number,
            city:this.#city,
            state:this.#state
        };
        return Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== undefined && value !== null)
        );
    }
    toJSON() {
        const data = {
            username: this.#username,
            password: this.#password,
            name: this.#name,
            email:this.#email,
            phone:this.#phone,
            business:this.#business,
            street:this.#street,
            number:this.#number,
            city:this.#city,
            state:this.#state
        };
        return Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== undefined && value !== null && value !== "")
        );
    }
}