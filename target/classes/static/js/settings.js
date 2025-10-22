import UserDTO from "./classes/user/UserDTO.js";
const form = document.getElementById("form");
const password = document.getElementById("password");
const name = document.getElementById("name");
const email = document.getElementById("email");
const education = document.getElementById("education");
const experience = document.getElementById("experience");
const phone = document.getElementById("phone");
const errorMessage = document.getElementById("errorMessage")
const deleteButton = document.getElementById("deleteButton");
const errorMessage1 = document.getElementById("errorMessage1");
const errorMessage2 = document.getElementById("errorMessage2");
const logoutButton = document.getElementById("logoutButton");
const inputs = {password, name, email, phone, experience, education};

(function(){
    if(sessionStorage.getItem("userData")){
        let data = JSON.parse(sessionStorage.getItem("userData"));
        name.value = data.name;
        if(data.email)
            email.value = data.email;
        if(data.password)
            password.value = data.password;
        if(data.phone)
            phone.value = data.phone;
        if(data.experience)
            experience.textContent = data.experience;
        if(data.education)
            education.textContent = data.education;
    }else{
        errorMessage.style.color = "red";
        errorMessage.textContent = "Unable to get all user data";
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
        let data = null;
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
        const url = `http://${sessionStorage.getItem("ip")}:${sessionStorage.getItem("port")}/users/${userId}`;
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
            if ( data && data.details) {
                data.details.forEach(({field, error}) => {
                    if (inputs[field]) {
                        inputs[field].setCustomValidity(error);
                    }
                });
            }
        }else {
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
form.addEventListener("submit",async (event)=>{
    try {
        console.log(JSON.stringify(new UserDTO(null, password.value,name.value,email.value,phone.value,experience.value,education.value).toUpdateJSON()));
        event.preventDefault();
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
})

