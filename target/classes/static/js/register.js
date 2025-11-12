import UserDTO from "./classes/user/UserDTO.js";
import {appendChildren} from "./classes/globalFunctions.js";
import {setAttributes} from "./classes/globalFunctions.js";
import CompanyDTO from "./classes/company/CompanyDTO.js";
const registerCompanyAnchor= document.getElementById("registerCompany");
const form = document.getElementById("form");
const errorMessage = document.getElementById("errorMessage")
let fieldsetCommonUser = document.createElement("fieldset");
let fieldsetCompany = document.createElement("fieldset");
let inputs;
let inputsCompany;
let currentFieldset = "commonUser";
function submitCommonUser(event){
    event.preventDefault();
    registerCommonUser(inputs.username, inputs.password, inputs.name, inputs.email, inputs.phone, inputs.experience,inputs.education);
}
function submitCompany(event){
    event.preventDefault();//username,password,name,email,phone,business,number,street,city,state
    registerCompany(inputsCompany.username, inputsCompany.password, inputsCompany.name, inputsCompany.email, inputsCompany.phone, inputsCompany.business,inputsCompany.number, inputsCompany.street, inputsCompany.city, inputsCompany.state);

}
registerCompanyAnchor.addEventListener("click",(event)=> {
    event.preventDefault()
    form.firstChild.remove();
    if (currentFieldset === "commonUser") {
        form.insertBefore(fieldsetCompany, form.firstChild);
        registerCompanyAnchor.textContent = "Register a user";
        form.removeEventListener("submit",submitCommonUser)
        form.addEventListener("submit",submitCompany);
        currentFieldset="company";
    }else{
        form.insertBefore(fieldsetCommonUser, form.firstChild);
        registerCompanyAnchor.textContent = "Register a company";
        form.removeEventListener("submit",submitCompany);
        form.addEventListener("submit",submitCommonUser)
        currentFieldset="commonUser";
    }


});
(function(){
    let usernameLabel = document.createElement("label");
    usernameLabel.setAttribute("for","username");
    usernameLabel.textContent = "Username"
    let username = document.createElement("input");
    setAttributes(username,{id:"username",type:"text",placeholder:"username",pattern:"^[0-9A-Za-z]{3,20}$",required:""});
    let passwordLabel = document.createElement("label");
    passwordLabel.setAttribute("for","password");
    passwordLabel.textContent = "Password";
    let password = document.createElement("input");
    setAttributes(password,{type:"text",id:"password",placeholder:"password",pattern:"^[0-9A-Za-z]{3,20}$",required:""})
    let nameLabel = document.createElement("label");
    nameLabel.setAttribute("for","name");
    nameLabel.textContent = "Name";
    let name = document.createElement("input");
    setAttributes(name,{type:"text",id:"name",placeholder:"name",minLength:"4",maxLength:"150",required:""});
    let emailLabel = document.createElement("label");
    emailLabel.setAttribute("for","email");
    emailLabel.textContent="Email";
    let email =  document.createElement("input");
    setAttributes(email,{type:"email",id:"email",placeholder:"email"});
    let phoneLabel = document.createElement("label");
    phoneLabel.setAttribute("for","phone");
    phoneLabel.textContent = "Phone";
    let phone = document.createElement("input");
    setAttributes(phone,{type:"text",id:"phone",placeholder:"phone"});
    const experienceLabel = document.createElement("label");
    experienceLabel.setAttribute("for","experience");
    experienceLabel.textContent = "Experience";
    const experience = document.createElement("textarea");
    setAttributes(experience,{id:"experience",placeholder:"Experience",minLength:"10",maxLength:"600"});
    const educationLabel = document.createElement("label");
    educationLabel.setAttribute("for","education");
    educationLabel.textContent = "Education";
    const education = document.createElement("textarea");
    setAttributes(education,{id:"education",placeholder:"education",minLength:"10",maxLength:"600"});
    appendChildren(fieldsetCommonUser,[usernameLabel,username,nameLabel,name,passwordLabel,password,emailLabel,email,phoneLabel,phone,experienceLabel,experience,educationLabel,education]);

    form.insertBefore(fieldsetCommonUser,form.firstChild);
    form.addEventListener("submit",submitCommonUser);

    inputs = {username, password, name, email, phone, experience, education};
    usernameLabel = document.createElement("label");
    usernameLabel.setAttribute("for","username");
    usernameLabel.textContent = "Username"
    username = document.createElement("input");
    setAttributes(username,{id:"username",type:"text",placeholder:"username",pattern:"^[0-9A-Za-z]{3,20}$",required:""});
    passwordLabel = document.createElement("label");
    passwordLabel.setAttribute("for","password");
    passwordLabel.textContent = "Password";
    password = document.createElement("input");
    setAttributes(password,{type:"text",id:"password",placeholder:"password",pattern:"^[0-9A-Za-z]{3,20}$",required:""})
    nameLabel = document.createElement("label");
    nameLabel.setAttribute("for","name");
    nameLabel.textContent = "Name";
    name = document.createElement("input");
    setAttributes(name,{type:"text",id:"name",placeholder:"name",minLength:"4",maxLength:"150",required:""});
    const emailLabel1 = document.createElement("label");
    emailLabel1.textContent= "Email"
    emailLabel1.setAttribute("for","email");
    email = document.createElement("input");
    setAttributes(email,{type:"email",id:"email",required:""})
    phoneLabel = document.createElement("label");
    phoneLabel.setAttribute("for","phone");
    phoneLabel.textContent = "Phone";
    phone = document.createElement("input");
    setAttributes(phone,{type:"text",id:"phone",placeholder:"(DD)NNNNN-NNNN",required:""});
    const streetLabel = document.createElement("label");
    streetLabel.setAttribute("for","street");
    streetLabel.textContent= "Street";
    const street = document.createElement("input");
    setAttributes(street,{type:"text",id:"street",minLength:"3",maxLength:"150",required:""})
    const numberLabel = document.createElement("label");
    numberLabel.setAttribute("for","number");
    numberLabel.textContent = "Number";
    const number = document.createElement("input");
    setAttributes(number,{min:"0",max:"1000000000",required:"",id:"number",type:"number"});
    const cityLabel = document.createElement("label");
    cityLabel.setAttribute("for","city");
    cityLabel.textContent="City";
    const city = document.createElement("input");
    setAttributes(city,{required:"",minLength:"3",type:"text",maxLength:"150",id:"city"});
    const stateLabel = document.createElement("label");
    stateLabel.setAttribute("for","state");
    stateLabel.textContent="State";
    const state  = document.createElement("input");
    setAttributes(state,{required:"",type:"text",id:"state"});
    const businessLabel = document.createElement("label");
    businessLabel.setAttribute("for","business");
    businessLabel.textContent= "Business";
    const business = document.createElement("input");
    setAttributes(business,{required:"",type:"text",minLength:"4",maxLength:"150",id:"business"});
    appendChildren(fieldsetCompany,[usernameLabel,username,passwordLabel,password,nameLabel,name,phoneLabel,phone,emailLabel1,email,businessLabel,business,numberLabel,number,streetLabel,street,cityLabel,city,stateLabel,state]);
    inputsCompany = {username,password,name,phone,email,business,number,street,city,state};
})()
async function registerCommonUser(username,password,name,email,phone,experience,education){
    try {
        let bodyJson = JSON.stringify(new UserDTO(username.value,password.value,name.value,email.value,phone.value,education.value
        ,experience.value).toJSON());
        console.log(bodyJson);
        const url = `http://${sessionStorage.getItem("ip")}:${sessionStorage.getItem("port")}/users`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: bodyJson
        };
        console.log("POST Request URL:", url);
        console.log("POST Request Options:", options);
        console.log("Body JSON:", JSON.parse(bodyJson));
        let response = await fetch(url, options);
        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch {
            data = { message: text };
        }
        console.log("Status:",response.status);
        console.log("Headers:",response.headers);
        console.log("Body:",data || " It's not JSON");
        if(response.status !== 201) {
            errorMessage.style.color = 'red';
            if (data.message === undefined || data.message === null) {
                errorMessage.textContent = "Internal Server error";
            } else {
                errorMessage.textContent = data.message;
            }
            if (data.details !== undefined && data.details !== null) {
                data.details.forEach(({field, error}) => {
                    if (inputs[field]) {
                        inputs[field].setCustomValidity(error);
                    }
                });
            }}else {
                errorMessage.style.color = 'green';
                errorMessage.textContent = "Successfully registered"
            }
    }catch(e){
        console.log(e.message);
    }
}

async function registerCompany(username,password,name,email,phone,business,number,street,city,state){
    try {

        let bodyJson = JSON.stringify(new CompanyDTO(username.value,password.value,name.value,email.value,phone.value,business.value,street.value,number.value,city.value,state.value).toJSON());
        console.log(bodyJson);
        const url = `http://${sessionStorage.getItem("ip")}:${sessionStorage.getItem("port")}/companies`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: bodyJson
        };
        console.log("POST Request URL:", url);
        console.log("POST Request Options:", options);
        console.log("Body JSON:", JSON.parse(bodyJson));
        let response = await fetch(url, options);
        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch {
            data = { message: text };
        }
        console.log("Status:",response.status);
        console.log("Headers:",response.headers);
        console.log("Body:",data || " It's not JSON");
        if(response.status !== 201) {
            errorMessage.style.color = 'red';
            if (data.message === undefined || data.message === null) {
                errorMessage.textContent = "Internal Server error";
            } else {
                errorMessage.textContent = data.message;
            }
            if (data.details !== undefined && data.details !== null) {
                data.details.forEach(({field, error}) => {
                    if (inputsCompany[field]) {
                        inputsCompany[field].setCustomValidity(error);
                    }
                });
            }}else {
            errorMessage.style.color = 'green';
            errorMessage.textContent = "Successfully registered"
        }
    }catch(e){
        console.log(e.message);
    }
}

