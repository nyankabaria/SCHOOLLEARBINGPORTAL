
// =====================
// DEFAULT ADMIN ACCOUNT
// =====================
if(!localStorage.getItem("users")){

    let defaultUsers = [
        {
            username:"admin",
            password:"admin123",
            role:"admin"
        }
    ];

    localStorage.setItem("users", JSON.stringify(defaultUsers));
}

// =====================
// CHECK LOGIN
// =====================
function checkLogin(role){

    let user = JSON.parse(localStorage.getItem("currentUser"));

    if(!user){
        window.location.href = "login.html";
        return;
    }

    if(user.role !== role && user.role !== "admin"){
        alert("Unauthorized Access");
        window.location.href = "login.html";
    }
}

// =====================
// LOGOUT
// =====================
function logout(){

    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

// =====================
// LOGIN
// =====================
function login(){

    let u = document.getElementById("username").value.trim();
    let p = document.getElementById("password").value.trim();
    let r = document.getElementById("role").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let found = users.find(x =>
        x.username === u &&
        x.password === p &&
        x.role === r
    );

    if(!found){
        alert("Invalid login details");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(found));

    window.location.href = found.role + ".html";
}

// =====================
// CREATE USER
// =====================
function createUser(){

    let u = document.getElementById("u").value.trim();
    let p = document.getElementById("p").value.trim();
    let r = document.getElementById("r").value;

    if(!u || !p){
        alert("Fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.find(x => x.username === u);

    if(exists){
        alert("User already exists");
        return;
    }

    users.push({
        username:u,
        password:p,
        role:r
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("User created successfully");

    document.getElementById("u").value = "";
    document.getElementById("p").value = "";
}

// =====================
// UPLOAD VIDEO
// =====================
function uploadVideo(){

    let title = document.getElementById("videoTitle").value.trim();
    let file = document.getElementById("videoFile").files[0];

    if(!title || !file){
        alert("Fill all fields");
        return;
    }

    let reader = new FileReader();

    reader.onload = function(e){

        let videos = JSON.parse(localStorage.getItem("videos")) || [];

        videos.push({
            title:title,
            file:e.target.result
        });

        localStorage.setItem("videos", JSON.stringify(videos));

        alert("Video uploaded");

        document.getElementById("videoTitle").value = "";
        document.getElementById("videoFile").value = "";

        loadVideos();
    };

    reader.readAsDataURL(file);
}

// =====================
// LOAD VIDEOS
// =====================
function loadVideos(){

    let videos = JSON.parse(localStorage.getItem("videos")) || [];

    let box = document.getElementById("videoList");

    if(!box) return;

    box.innerHTML = "";

    videos.forEach(v => {

        box.innerHTML += `
        <div class="item">
            <h4>${v.title}</h4>

            <video controls>
                <source src="${v.file}">
            </video>
        </div>
        `;
    });
}

// =====================
// UPLOAD NOTES
// =====================
function uploadNote(){

    let title = document.getElementById("noteTitle").value.trim();
    let file = document.getElementById("noteFile").files[0];

    if(!title || !file){
        alert("Fill all fields");
        return;
    }

    let reader = new FileReader();

    reader.onload = function(e){

        let notes = JSON.parse(localStorage.getItem("notes")) || [];

        notes.push({
            title:title,
            file:e.target.result,
            name:file.name
        });

        localStorage.setItem("notes", JSON.stringify(notes));

        alert("Note uploaded");

        document.getElementById("noteTitle").value = "";
        document.getElementById("noteFile").value = "";

        loadNotes();
    };

    reader.readAsDataURL(file);
}

// =====================
// LOAD NOTES
// =====================
function loadNotes(){

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    let box = document.getElementById("noteList");

    if(!box) return;

    box.innerHTML = "";

    notes.forEach(n => {

        box.innerHTML += `
        <div class="item">
            <h4>${n.title}</h4>

            <a href="${n.file}" download="${n.name}">
                Download File
            </a>
        </div>
        `;
    });
}
