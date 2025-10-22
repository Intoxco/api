import UserDTO from "./classes/user/UserDTO.js";
const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const name = document.getElementById("name");
const email = document.getElementById("email");
const education = document.getElementById("education");
const experience = document.getElementById("experience");
const phone = document.getElementById("phone");
const errorMessage = document.getElementById("errorMessage")
const inputs = {username, password, name, email, phone, experience, education};

form.addEventListener("submit",async (event)=>{
    event.preventDefault();
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
        const responseBody = await response.text();
        console.log("Status:",response.status);
        console.log("Headers:",response.headers);
        let data = await response.json();
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
})

