import UserDTO from "./classes/user/UserDTO.js";
import CompanyDTO from "./classes/company/CompanyDTO.js";
import {appendChildren} from "./classes/globalFunctions.js";
import {setAttributes} from "./classes/globalFunctions.js";

const form = document.getElementById("form");
const fieldset = document.getElementsByTagName("fieldset").item(0);
const errorMessage = document.getElementById("errorMessage")
const deleteButton = document.getElementById("deleteButton");
const errorMessage1 = document.getElementById("errorMessage1");
const errorMessage2 = document.getElementById("errorMessage2");
const logoutButton = document.getElementById("logoutButton");
let inputs;


(function(){
    if(sessionStorage.getItem("userData")){
        const passwordLabel = document.createElement("label");
        passwordLabel.setAttribute("for","password");
        passwordLabel.textContent="Password";
        const passwordInput = document.createElement("input");
        setAttributes(passwordInput,{type:"text",id:"password",pattern:"^[0-9A-Za-z]{3,20}$",required:""})
        const nameLabel = document.createElement("label");
        nameLabel.setAttribute("for","name");
        nameLabel.textContent="Name";
        const nameInput = document.createElement("input");
        setAttributes(nameInput,{type:"text",id:"name",minLength:"4",maxLength:"150",required:""});
        const emailLabel = document.createElement("label");
        emailLabel.textContent= "Email"
        emailLabel.setAttribute("for","email");
        const emailInput = document.createElement("input");
        setAttributes(emailInput,{type:"email",id:"email"})
        const phoneLabel = document.createElement("label");
        phoneLabel.setAttribute("for","phone");
        phoneLabel.textContent = "Phone";
        const phoneInput = document.createElement("input");
        setAttributes(phoneInput,{type:"text",id:"phone",placeholder:"(DD)NNNNN-NNNN",pattern:"(\\([0-9]{2}\\)|[0-9]{2})9?[0-9]{4}-?[0-9]{4}"});
        const experienceLabel = document.createElement("label");
        experienceLabel.setAttribute("for","experience");
        experienceLabel.textContent="Experience";
        const experienceInput = document.createElement("textarea");
        setAttributes(experienceInput,{id:"experience",placeholder:"Experience",minLength:"10",maxLength:"500"});
        const educationLabel = document.createElement("label");
        educationLabel.setAttribute("for","education");
        educationLabel.textContent = "Education";
        const educationInput = document.createElement("textarea");
        setAttributes(educationInput,{id:"education",placeholder:"Education",minLength:"10",maxLength:"500"});
        appendChildren(fieldset,[passwordLabel,passwordInput,nameLabel,nameInput,emailLabel,emailInput,phoneLabel,phoneInput,experienceLabel,experienceInput,educationLabel,educationInput]);
        let data = JSON.parse(sessionStorage.getItem("userData"));
        nameInput.value = data.name;
        if(data.email)
            emailInput.value = data.email;
        if(data.password)
            passwordInput.value = data.password;
        if(data.phone)
            phoneInput.value = data.phone;
        if(data.experience)
            experienceInput.textContent = data.experience;
        if(data.education)
            educationInput.textContent = data.education;
        inputs = {passwordInput, nameInput, emailInput, phoneInput, experienceInput, educationInput};
        form.addEventListener("submit",(event)=>{
            event.preventDefault();
            updateUser(passwordInput, nameInput, emailInput, phoneInput, experienceInput, educationInput);
        });
    }else if(sessionStorage.getItem("companyData")) {
        const passwordLabel = document.createElement("label");
        passwordLabel.setAttribute("for","password");
        passwordLabel.textContent="Password";
        const passwordInput = document.createElement("input");
        setAttributes(passwordInput,{type:"text",id:"password",pattern:"^[0-9A-Za-z]{3,20}$",required:""})
        const nameLabel = document.createElement("label");
        nameLabel.setAttribute("for","name");
        nameLabel.textContent="Name";
        const nameInput = document.createElement("input");
        setAttributes(nameInput,{type:"text",id:"name",minLength:"4",maxLength:"150",required:""});
        const emailLabel = document.createElement("label");
        emailLabel.textContent= "Email"
        emailLabel.setAttribute("for","email");
        const emailInput = document.createElement("input");
        setAttributes(emailInput,{type:"email",id:"email",required:""})
        const phoneLabel = document.createElement("label");
        phoneLabel.setAttribute("for","phone");
        phoneLabel.textContent = "Phone";
        const phoneInput = document.createElement("input");
        setAttributes(phoneInput,{type:"text",id:"phone",placeholder:"(DD)NNNNN-NNNN",pattern:"(.|\([0-9]{2}\)|[0-9]{2})9?[0-9]{4}-?[0-9]{4}",required:""});
        const streetLabel = document.createElement("label");
        streetLabel.setAttribute("for","street");
        streetLabel.textContent= "Street";
        const streetInput = document.createElement("input");
        setAttributes(streetInput,{type:"text",id:"street",minLength:"3",maxLength:"150",required:""})
        const numberLabel = document.createElement("label");
        numberLabel.setAttribute("for","number");
        numberLabel.textContent = "Number";
        const numberInput = document.createElement("input");
        setAttributes(numberInput,{min:"0",max:"1000000000",required:"",id:"number",type:"number"});
        const cityLabel = document.createElement("label");
        cityLabel.setAttribute("for","city");
        cityLabel.textContent="City";
        const cityInput = document.createElement("input");
        setAttributes(cityInput,{required:"",minLength:"3",type:"text",maxLength:"150",id:"city"});
        const stateLabel = document.createElement("label");
        stateLabel.setAttribute("for","state");
        stateLabel.textContent="State";
        const stateInput  = document.createElement("input");
        setAttributes(stateInput,{required:"",type:"text",id:"state"});
        const businessLabel = document.createElement("label");
        businessLabel.setAttribute("for","business");
        businessLabel.textContent= "Business";
        const businessInput = document.createElement("input");
        setAttributes(businessInput,{required:"",type:"text",minLength:"4",maxLength:"150",id:"business"});
        inputs={nameInput,passwordInput,emailInput,businessInput,phoneInput,numberInput,streetInput,cityInput,stateInput};
        appendChildren(fieldset,[nameLabel,nameInput,passwordLabel,passwordInput,emailLabel,emailInput,businessLabel,businessInput,phoneLabel,phoneInput,numberLabel,numberInput,streetLabel,streetInput,cityLabel,cityInput,stateLabel,stateInput]);
        let data = JSON.parse(sessionStorage.getItem("companyData"));
        nameInput.value = data.name;
        if(data.email)
            emailInput.value = data.email;
        if(data.password)
            passwordInput.value = data.password;
        if(data.phone)
            phoneInput.value = data.phone;
        if(data.business)
            businessInput.value = data.business;
        if(data.street)
            streetInput.value = data.street;
        if(data.number)
            numberInput.value  = data.number;
        if(data.city)
            cityInput.value=  data.city;
        if(data.state)
            stateInput.value = data.state;
        form.addEventListener("submit",(event)=> {
            event.preventDefault();
            updateCompany(passwordInput, nameInput, emailInput, phoneInput, businessInput, numberInput, streetInput, cityInput, stateInput);
        });
    }
    else {
        errorMessage.style.color = "red";
        errorMessage.textContent = "Unable to get all user/company data";
    }
})()
logoutButton.addEventListener("click",async(event)=>{
    try{
        console.log("Token:",sessionStorage.getItem("token"));
        const url = `http://${sessionStorage.getItem("ip")}:${sessionStorage.getItem("port")}/logout`;
        const options = {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            }
        };
        console.log("POST Request URL:", url);
        console.log("POST Request Options:", options);
        let response = await fetch(url, options);
        console.log("Status:",response.status);
        console.log("Headers:",response.headers);
        let data;
        const text = await response.text();

        try {
            data = JSON.parse(text);
        } catch {
            console.log("Resposta não é JSON:", text);
            data = text;
        }
        console.log("Body:",data || " It's not JSON");
        if(response.status !== 200) {
            errorMessage2.style.color = 'red';
            if (!data || !data.message) {
                errorMessage2.textContent = "Internal Server error";
            } else {
                errorMessage2.textContent = data.message;
            }
        }else {
            sessionStorage.removeItem("companyData");
            sessionStorage.removeItem("userData");
            sessionStorage.removeItem("password");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("decodedToken");
            document.location.href = "login.html"
        }
    }catch(e){
        console.log(e.message);
    }
})
deleteButton.addEventListener("click",async (event)=>{
    try{

        const userId = JSON.parse(sessionStorage.getItem("decodedToken")).sub;
        const url = `http://${sessionStorage.getItem("ip")}:${sessionStorage.getItem("port")}/${sessionStorage.getItem("userData") ? "users" : "companies"
        }/${userId}`;
        const options = {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            }
        };
        console.log("DELETE Request URL:", url);
        console.log("DELETE Request Options:", options);
        let response = await fetch(url, options);
        console.log("Status:",response.status);
        console.log("Headers:",response.headers);
        let data = null;
        const text = await response.text();
        if (text) {
            data = JSON.parse(text);
        }
        console.log("Body:",data || " It's not JSON");
        if(response.status !== 200) {
            errorMessage1.style.color = 'red';
            if (!data || !data.message) {
                errorMessage1.textContent = "Internal Server error";
            } else {
                errorMessage1.textContent = data.message;
            }
        }else {
            sessionStorage.removeItem("userData");
            sessionStorage.removeItem("companyData");
            sessionStorage.removeItem("password");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("decodedToken");
            document.location.href = "login.html"
        }
    }catch(e){
        console.log(e.message);
    }
})
async function updateCompany(password,name,email,phone,business,number,street,city,state){
    try {

        console.log(JSON.stringify(new CompanyDTO(null, password.value,name.value,email.value,phone.value,business.value,street.value,number.value,city.value,state.value).toUpdateJSON()));
        const companyId = JSON.parse(sessionStorage.getItem("decodedToken")).sub;
        const url = `http://${sessionStorage.getItem("ip")}:${sessionStorage.getItem("port")}/companies/${companyId}`;
        const bodyData = new CompanyDTO(
            null,
            password.value,
            name.value,
            email.value,
            phone.value,
            business.value,
            street.value,
            number.value,
            city.value,
            state.value
        ).toUpdateJSON();

        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            body: JSON.stringify(bodyData)
        };
        console.log("PATCH Request URL:", url);
        console.log("PATCH Request Options:", options);
        console.log("PATCH Request Body JSON:", JSON.stringify(bodyData));
        let response = await fetch(url, options);
        console.log("Status:",response.status);
        console.log("Headers:",response.headers);
        let data = null;
        const text = await response.text();
        if (text) {
            data = JSON.parse(text);
        }
        console.log("Body:",data || " It's not JSON");
        if(response.status !== 200) {
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
            errorMessage.textContent = "Successfully updated";
            let oldCompanyData = JSON.parse(sessionStorage.getItem("companyData"));
            sessionStorage.setItem("companyData",JSON.stringify(new CompanyDTO(oldCompanyData.username,password.value,name.value,email.value,phone.value,business.value,street.value,number.value,city.value,state.value)));
        }
    }catch(e){
        console.log(e.message);
    }
}
async function updateUser (password,name,email,phone,experience,education){
    try {
        console.log(JSON.stringify(new UserDTO(null, password.value,name.value,email.value,phone.value,experience.value,education.value).toUpdateJSON()));
        const userId = JSON.parse(sessionStorage.getItem("decodedToken")).sub;
        const url = `http://${sessionStorage.getItem("ip")}:${sessionStorage.getItem("port")}/users/${userId}`;

        const bodyData = new UserDTO(
            null,
            password.value,
            name.value,
            email.value,
            phone.value,
            experience.value,
            education.value
        ).toUpdateJSON();

        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            body: JSON.stringify(bodyData)
        };
        console.log("PATCH Request URL:", url);
        console.log("PATCH Request Options:", options);
        console.log("PATCH Request Body JSON:", bodyData);
        let response = await fetch(url, options);
        console.log("Status:",response.status);
        console.log("Headers:",response.headers);
        let data = null;
        const text = await response.text();
        if (text) {
            data = JSON.parse(text);
        }
        console.log("Body:",data || " It's not JSON");
        if(response.status !== 200) {
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
                errorMessage.textContent = "Successfully updated";
                let oldUserData = JSON.parse(sessionStorage.getItem("userData"));
                sessionStorage.setItem("userData",JSON.stringify(new UserDTO(oldUserData.username,password.value,name.value,email.value,phone.value,experience.value,education.value)));
        }
    }catch(e){
        console.log(e.message);
    }
}

