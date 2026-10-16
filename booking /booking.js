var services={gender:"",service:{}}
var selectedDate
var dateElement=document.getElementById("date")
var loginstatus=false
var total
document.addEventListener("DOMContentLoaded", function (){
  
  
    if(localStorage.getItem("loginStatus")==="true"){
      loginstatus=true
    
    
      document.getElementById("name").value=name
      document.getElementById("phone").value=localStorage.getItem("k2ph")
      
      booking_email = document.getElementById("email").value=email
    }
    var today= new Date().toLocaleDateString('en-CA')
    selectedDate=today
    dateElement.value=selectedDate
    console.log(selectedDate)
    dateElement.min=today
    updateTimeSlot(selectedDate)

})

const male= [
    "HAIR & BEARD",
    "COLOUR",
    "FACIAL",
    "ADVANCE FACIAL",
    "HAIR TREATMENTS",
    "WELLNESS & RELAXATION"
  ]
const female=[
    "HAIR",
    "NORMAL WAXING",
    "RICA WAXING",
    "FACIAL LOTUS",
    "ADVANCE FACIAL LOTUS",
    "THREADING",
    "NANOPLASTEIA TREATMENT",
    "PEDICURE MANICURE",
    "COLOUR"
  ]


let selectedTime = "";

document.querySelectorAll(".slot").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".slot").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedTime = btn.innerText;
  }
});

function book(){

  const data = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    date: document.getElementById("date").value,
    time: selectedTime,
    servic: services.service,
    totalamount: "₹"+total,
    status:"active"
  };

  console.log(data);
  if(data.name != "" && data.phone != "" && data.date != null && data.time != "" && Object.keys(data.servic).length>0 && data
    .email != ""){
let serviceText = Object.entries(data.servic).map(([name,price]) => `${name}:${price}`).join("<br>")
      const out = document.getElementById("output");
      out.style.display = "block";
    out.innerHTML = `
    Name: ${data.name} <br>
    Phone: ${data.phone} <br>
    Email: ${data.email} <br>
    Date: ${data.date} <br>
    Time: ${data.time}<br>
    service:${serviceText}
  `;
  db.collection("bookings").doc("active").collection(data.date).doc(data.time).set(data).then(()=>{
    if(loginstatus){
      db.collection("Users").doc(email).collection("active_booking").doc(data.date+"\t"+data.time).set(data).then(()=>{
        //yaha pe api call client ko email
      }).catch((error)=>{
        alert(error.message)
      })
    }
    alert("booked")
    fetch("https://emailapi4k2.vercel.app/send-email",{
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({
        "to":"k2sallon@gmail.com",
        "subject":"New Booking(testing)",
        "message":"<h1>"+data.name+"</h1><p>date:"+data.date+"<br>time:"+data.time+"<br>Service:"+serviceText+"<br>total:"+data.totalamount+"</p><h4>Email:"+data.email+"<br>Phone:"+data.phone+"</h4>"
      })
    }).then(()=>{
        ///window.location.reload()
      })
  }).catch((error)=>{
    alert(error.message)
  })
  }else{
    alert("incomplete details")
  }
  
};

document.getElementById("gender").addEventListener("change", function (){
  var select=document.getElementById("gender").value
  var category=document.getElementById("service-category")
  category.innerHTML="<option> Select a category</option>"
  services.gender=select
  console.log(services)
  if(select==="male"){
    male.forEach(item =>{
      var option=document.createElement("option")
      option.value=item
      option.textContent=item
      category.appendChild(option)
    })
  }else if(select==="femalee"){
    female.forEach(item =>{
      var option=document.createElement("option")
      option.value=item
      option.textContent=item
      category.appendChild(option)
    })
  }
})

document.getElementById("service-category").addEventListener("change", function (){
  var category=document.getElementById("service-category").value
  var serv=document.getElementById("serv")
  console.log(category+"=>"+services.gender)
  serv.innerHTML=""
  db.collection("service").doc(services.gender).collection(category).get().then((snap)=>{
    if(snap.empty){
      console.log("no data")
      return 
    }
    snap.forEach((doc)=>{
      var service_name=doc.id
      var service_price= parseFloat(doc.data().price)
      console.log(service_name+"=>"+service_price)
      var card=document.createElement("div")
      var add_button=document.createElement("input")
      add_button.type="button"
      add_button.value="Add"
      add_button.onclick=()=>add(service_name,service_price)
      card.id="serviceDetails"
      card.innerHTML="<h3>"+service_name+"</h3>"+"<p> ₹"+service_price+"</p>"
      card.appendChild(add_button)
      
      serv.appendChild(card)
    })
  }).catch((error)=>{
    alert(error.message)
  })
})

function add(service_name,service_price) {
  services.service[service_name]=service_price
  console.log(services.service)
  subtotal()
}

function subtotal(){
  var parent=document.getElementById("subtotal")
  console.log(parent)
  parent.innerHTML=""
  total=0
  Object.entries(services.service).forEach(([name,price])=>{
    console.log(name+"=>"+price)
    var subtotal_card=document.createElement("div")
    subtotal_card.innerHTML="<h3>"+name+"</h3> <span>₹"+price+"</span>"
    subtotal_card.id="subtotal_card"
    parent.appendChild(subtotal_card)
    total+=price
    
  })
  var totaldiv = document.createElement("div")
totaldiv.id = "totaldiv"
totaldiv.innerHTML = "<h2> Total</h2><span>₹" + total + "</span>"
console.log(total)
parent.appendChild(totaldiv)
}

dateElement.addEventListener("input",(e)=>{
  selectedDate=e.target.value
  console.log(selectedDate)
  updateTimeSlot(selectedDate)
})

function updateTimeSlot(date) {
  document.querySelectorAll('.slot').forEach((btn)=>{
    btn.disabled=false
  })
  db.collection("bookings").doc("active").collection(date).get().then((slot)=>{
    slot.forEach((data)=>{
      var button=document.getElementById(data.id)
      console.log(button)
      button.disabled=true
    
    })
  })
}