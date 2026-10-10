function add(){
  var gender=document.getElementById("gender").value
  var serviceType=document.getElementById("serviceType").value
  var service=document.getElementById("serviceName").value
  var price=document.getElementById("servicePrice").value
  
  db.collection("service").doc(gender).collection(serviceType).doc(service).set({price:price}).then(()=>{
    alert("added")
    location.reload()
  }).catch((error)=>{
    alert(error.message)
  })
  
}