
function checkLogin(role){

    let user = JSON.parse(localStorage.getItem("currentUser"));

    if(!user){
        window.location.href = "login.html";
        return;
    }

    if(user.role !== role && user.role !== "admin"){
        alert("Unauthorized");
        window.location.href = "login.html";
    }
}

function logout(){
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

// LOGIN
function login(){

    let u = document.getElementById("username").value.trim();
    let p = document.getElementById("password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let found = users.find(x => x.username === u && x.password === p);

    if(!found){
        alert("Invalid login");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(found));

    window.location.href = found.role + ".html";
}

// SWITCH MODE (ADMIN)
function switchMode(role){
    let user = JSON.parse(localStorage.getItem("currentUser"));

    if(user.role !== "admin"){
        alert("Only admin can switch modes");
        return;
    }

    localStorage.setItem("activeMode", role);
    window.location.href = role + ".html";
}