function adminLogin(){
    var email = document.getElementById("adminEmail").value.trim();
    var pass = document.getElementById("adminPassword").value;
    var err = document.getElementById("errorMsg");

    if(!email || !pass){
        err.innerText = "Email & Password required";
        return;
    }
    err.innerText = "Checking...";

    auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
        return db.collection("admins").doc(email).get();
    })
    .then((doc) => {
        if(doc.exists && doc.data().role === "admin"){
            localStorage.setItem("K2AdminEmail", email);
            localStorage.setItem("isK2Admin", "true");
            localStorage.setItem("loginStatus", "true");
            window.location.replace("/admin/dashboard /index.html");
        } else {
            firebase.auth().signOut();
            err.innerText = "Access Denied! Not a K2 Admin.";
        }
    })
    .catch((e) => {
        err.innerText = e.message;
    });
}

(function(){
    if(localStorage.getItem("isK2Admin") === "true"){
        window.location.replace("/admin/dashboard /index.html");
    }
})();