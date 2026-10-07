var email
var loginStatus
var name
var ph
var email
const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('.service');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      chips.forEach(c => c.setAttribute('aria-pressed', c === chip));
      cards.forEach(card => { card.hidden = !(f === 'all' || card.dataset.cat === f); });
    });
  });
  
  function check(){
    email= localStorage.getItem("K2Email")
    loginStatus= localStorage.getItem("loginStatus")
    if (email && loginStatus){
      var nav=document.getElementById("nav-actions")
      retrive(email)
      nav.innerHTML=""
    }
  }
  
  function retrive(email){
    db.collection("Users").doc(email).get().then((snap)=>{
      if (snap.exists){
        var userData=snap.data()
        name=userData.Name
        console.log(name)
        var nav=document.getElementById("nav-actions")
        nav.innerHTML="<a href='/accounting/profile /profile.html' class='btn btn-signup'>"+name+"</a>"
      }else{
        console.log("no data")
      }
    }).catch((error)=>{
      console.log(error.message)
    })
  }
  
  document.addEventListener("DOMContentLoaded",check)