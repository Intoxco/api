const url = "http://localhost:20001/"



//Put login

async function login(){
    const response = await fetch(url + "/login", {
        method: "POST",
        body: JSON.stringify( {
        username : "adm",
        password : "123456"
        }),
        headers: {
            "Content-type": "application/json",
        },
        });
        console.log(response);
}

login();