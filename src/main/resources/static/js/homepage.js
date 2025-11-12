import UserDTO from "./classes/user/UserDTO.js";
import CompanyDataDTO from "./classes/company/CompanyDTO.js";
const  main = document.getElementsByTagName("main").item(0)

let decodedToken = JSON.parse(sessionStorage.getItem("decodedToken"));
if(decodedToken.role === "company"){
    const nameTag = document.createElement("h1");
    nameTag.setAttribute("id","name");
    const businessTag = document.createElement("p");
    businessTag.setAttribute("id","business");
    const addressTag = document.createElement("p");
    addressTag.setAttribute("id","address");
    const emailTag = document.createElement("p");
    emailTag.setAttribute("id","email");
    const phoneTag = document.createElement("p");
    phoneTag.setAttribute("id","phone");
    main.appendChild(nameTag);
    main.appendChild(emailTag);
    main.appendChild(phoneTag);
    main.appendChild(addressTag);
    main.appendChild(businessTag);
    loadCompanyData(nameTag,emailTag,phoneTag,addressTag,businessTag);
}else if(decodedToken.role ==="user"){
    const nameTag = document.createElement("h1");
    nameTag.setAttribute("id","name");
    const emailTag = document.createElement("p");
    emailTag.setAttribute("id","email");
    const phoneTag = document.createElement("p");
    phoneTag.setAttribute("id","phone");
    const educationTag = document.createElement("p");
    educationTag.setAttribute("id","education");
    const experienceTag  = document.createElement("p");
    experienceTag.setAttribute("id","experience");
    main.appendChild(nameTag);
    main.appendChild(emailTag);
    main.appendChild(phoneTag);
    main.appendChild(educationTag);
    main.appendChild(experienceTag);
    loadUserData(nameTag,emailTag,phoneTag,educationTag,experienceTag);
}else{
    document.location.href="login.html";
}

async function loadCompanyData(nameTag,emailTag,phoneTag,addressTag,businessTag){
    if(!sessionStorage.getItem("companyData")) {
        try {
            let decodedToken = JSON.parse(sessionStorage.getItem("decodedToken"));
            console.log(decodedToken);
            let token = sessionStorage.getItem("token");
            const url = `http://${sessionStorage.getItem("ip")}:${sessionStorage.getItem("port")}/companies/${decodedToken.sub}`;
            const options = {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            };

            console.log("Fetch URL:", url);
            console.log("Fetch options:", options);
            const response = await fetch(url, options);
            console.log("Status:", response.status);
            console.log("Headers:", response.headers);
            let data = await response.json();
            console.log("Body:", data || " It's not JSON");
            if (response.status !== 200) {
                nameTag.textContent = "Could not load all user data";
            } else {//constructor(username,password,name,email,phone,business,street,number,city,state)
                let companyData = new CompanyDataDTO(data.username, sessionStorage.getItem("password"), data.name, data.email, data.phone,data.business,data.street,data.number,data.city,data.state);
                console.log(JSON.stringify(companyData.toJSON()));
                sessionStorage.setItem("companyData", JSON.stringify(companyData.toJSON()));
                nameTag.textContent = data.name;
                if (data.email)
                    emailTag.textContent = data.email;
                if (data.phone)
                    phoneTag.textContent = data.phone;
                if (data.business)
                    businessTag.textContent = data.business;
                if (data.street && data.number && data.city && data.state)
                    addressTag.textContent = "Rua " + data.street + ", numero " + data.number + ", "+data.city + ", "+data.state;
            }

        } catch (e) {
            console.log(e.message);
            nameTag.text= "Could not load all of the user data"
        }
    }else{
        let userData = JSON.parse(sessionStorage.getItem("companyData"));
        nameTag.textContent = userData.name;
        if (userData.email)
            email.textContent = userData.email;
        if (userData.phone)
            phone.textContent = userData.phone;
        if (userData.education)
            education.textContent = userData.education;
        if (userData.experience)
            experience.textContent = userData.experience;
    }
}
async function loadUserData(nameTag,emailTag,phoneTag,educationTag,experienceTag){
    if(!sessionStorage.getItem("userData")) {
        try {
            let decodedToken = JSON.parse(sessionStorage.getItem("decodedToken"));
            console.log(decodedToken);
            let token = sessionStorage.getItem("token");
            const url = `http://${sessionStorage.getItem("ip")}:${sessionStorage.getItem("port")}/users/${decodedToken.sub}`;
            const options = {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            };

            console.log("Fetch URL:", url);
            console.log("Fetch options:", options);
            const response = await fetch(url, options);
            console.log("Status:", response.status);
            console.log("Headers:", response.headers);
            let data = await response.json();
            console.log("Body:", data || " It's not JSON");
            if (response.status !== 200) {
                nameTag.textContent = "Could not load all user data";
            } else {
                let userData = new UserDTO(data.username, sessionStorage.getItem("password"), data.name, data.email, data.phone, data.experience, data.education);
                console.log(JSON.stringify(userData.toJSON()));
                sessionStorage.setItem("userData", JSON.stringify(userData.toJSON()));
                nameTag.textContent = data.name;
                if (data.email)
                    emailTag.textContent = data.email;
                if (data.phone)
                    phoneTag.textContent = data.phone;
                if (data.education)
                    educationTag.textContent = data.education;
                if (data.experience)
                    experienceTag.textContent = data.experience;
            }

        } catch (e) {
            console.log(e.message);
            nameTag.text= "Could not load all of the user data"
        }
    }else{
        let userData = JSON.parse(sessionStorage.getItem("userData"));
        nameTag.textContent = userData.name;
        if (userData.email)
            email.textContent = userData.email;
        if (userData.phone)
            phone.textContent = userData.phone;
        if (userData.education)
            education.textContent = userData.education;
        if (userData.experience)
            experience.textContent = userData.experience;
    }
}