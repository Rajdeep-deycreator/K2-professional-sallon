document.addEventListener("DOMContentLoaded", function() {

    var tabBtns = document.querySelectorAll('.tab-btn');
    var tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var target = btn.dataset.tab;

            tabBtns.forEach(function(b) {
                b.classList.remove('active');
            });

            tabContents.forEach(function(c) {
                c.classList.remove('active');
            });

            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
    retriveService()

});

var profileName= document.getElementById("profileName")
profileName.innerHTML=name
var profileEmail=document.getElementById("profileEmail")
profileEmail.innerHTML= localStorage.getItem("K2Email")

function logout(param) {
    auth.signOut()
    localStorage.removeItem("loginStatus")
    localStorage.removeItem("K2Email")
    window.location.replace("/")
}
function retriveService(){
    var current=document.getElementById("currentBookingsList")
    db.collection("Users").doc(email). collection("active_booking").where("status","==","active").get().then((data)=>{
        current.innerHTML=""
        data.forEach((information)=>{
            var card=document.createElement('div')
            var data=information.data()
            console.log(data)
            var servic= Object.entries(data.servic).map(([name,price])=>`${name}:₹${price}`).join("br")
            card.innerHTML=`<h1><span>${information.id}</span></h1><p>Service:<br>${servic}<br>Ammount:<span>${data.totalamount}</span></p>`
            card.id="serviceCard"
        
            current.appendChild(card)
        })
    }).catch((error)=>{
        console.log(error.message)
    })
}
