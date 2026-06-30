```javascript id="z3b17j"
// =========================
// FIREBASE IMPORTS
// =========================

import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// =========================
// FIREBASE CONFIG
// =========================

const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain: "YOUR_PROJECT.firebaseapp.com",

    projectId: "YOUR_PROJECT_ID",

    storageBucket: "YOUR_PROJECT.appspot.com",

    messagingSenderId: "YOUR_SENDER_ID",

    appId: "YOUR_APP_ID"
};

// =========================
// INITIALIZE FIREBASE
// =========================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// =========================
// LOGIN FUNCTION
// =========================

window.login = async function(){

    let username =
    document.getElementById("username").value;

    let password =
    document.getElementById("password").value;

    const querySnapshot =
    await getDocs(collection(db, "users"));

    let found = false;

    querySnapshot.forEach((doc) => {

        let user = doc.data();

        if(
            user.username === username &&
            user.password === password
        ){

            found = true;

            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );

            if(user.role === "admin"){
                window.location.href = "admin.html";
            }

            else if(user.role === "teacher"){
                window.location.href = "teacher.html";
            }

            else if(user.role === "student"){
                window.location.href = "student.html";
            }
        }
    });

    if(!found){
        alert("Invalid login details");
    }
};

// =========================
// ADD USER
// =========================

window.addUser = async function(){

    let username =
    document.getElementById("newUsername").value;

    let password =
    document.getElementById("newPassword").value;

    let role =
    document.getElementById("newRole").value;

    await addDoc(collection(db, "users"), {

        username,
        password,
        role
    });

    alert("User added successfully");
};
```
