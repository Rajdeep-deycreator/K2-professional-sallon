var search = document.getElementById("search");
var container=document.getElementById("container")
search.addEventListener("keydown", function (event){
  if(event.key === "Enter"){
    var email = search.value.trim().toLowerCase(); // email hamesha lower
    
    if(email === "") return;

    db.collection("Users").doc(email).get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Mil gaya:", doc.data());
        container.innerHTML+="<div class='card'><h1>"+doc.data().Name+"</h1></div>"
      } else {
        console.log("Is email ka user nahi hai");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
});