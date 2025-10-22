import UserDTO from "./classes/user/UserDTO.js";

let name = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let education = document.getElementById("education");
let experience = document.getElementById("experience");

( async function(){
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
                name.textContent = "Could not load all user data";
            } else {
                let userData = new UserDTO(data.username, sessionStorage.getItem("password"), data.name, data.email, data.phone, data.experience, data.education);
                console.log(JSON.stringify(userData.toJSON()));
                sessionStorage.setItem("userData", JSON.stringify(userData.toJSON()));
                name.textContent = data.name;
                if (data.email)
                    email.textContent = data.email;
                if (data.phone)
                    phone.textContent = data.phone;
                if (data.education)
                    education.textContent = data.education;
                if (data.experience)
                    experience.textContent = data.experience;
            }

        } catch (e) {
            console.log(e.message);
            name.value = "Could not load all of the user data"
        }
    }else{
        let userData = JSON.parse(sessionStorage.getItem("userData"));
        name.textContent = userData.name;
        if (userData.email)
            email.textContent = userData.email;
        if (userData.phone)
            phone.textContent = userData.phone;
        if (userData.education)
            education.textContent = userData.education;
        if (userData.experience)
            experience.textContent = userData.experience;
    }
})();