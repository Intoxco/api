(function() {
    if(sessionStorage.getItem("ip")!= null) {
        document.location.href = "login.html";
    }
}())
const form = document.getElementById("form");
const ip = document.getElementById("ip");
const port = document.getElementById("port");
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    sessionStorage.setItem("ip",ip.value);
    sessionStorage.setItem("port",port.value);
    document.location.href ="login.html"
})

