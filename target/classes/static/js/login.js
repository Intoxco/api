import LoginDTO from "./classes/login/LoginDTO.js";
const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage")
form.addEventListener("submit",async (event)=>{
    try {
        event.preventDefault();
        const loginData = new LoginDTO(username.value, password.value).toJSON();
        const loginUrl = `http://${sessionStorage.getItem("ip")}:${sessionStorage.getItem("port")}/login`;
        const loginOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        };
        console.log("POST Request URL:", loginUrl);
        console.log("POST Request Options:", loginOptions);
        let response = await fetch(loginUrl,loginOptions);
        console.log("Status:",response.status);
        console.log("Headers:",response.headers);
        let data = await response.json();
        console.log("Body:",data || " It's not JSON");
        const token = data.token;
        if(!token|| response.status !== 200){
            errorMessage.style.color = 'red';
            if(data.message){
                errorMessage.textContent="Internal Server error";
            }else{
                errorMessage.textContent=data.message;
            }
        }
        else {
            let payloadBase64 = token.split('.')[1];
            let payloadDecoded = atob(payloadBase64.replace(/=/g, '+').replace(/_/g, '/'));
            console.log("Decoded Token:", JSON.parse(payloadDecoded));
            sessionStorage.setItem("decodedToken", JSON.stringify(JSON.parse((payloadDecoded))));
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("password",password.value);
            document.location.href="homePage.html";
        }
    }catch(e){
        console.log(e.message);
    }
})

