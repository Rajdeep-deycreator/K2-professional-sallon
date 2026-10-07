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

});

var profileName= document.getElementById("profileName")
profileName.innerHTML=name
var profileEmail=document.getElementById("profileEmail")
profileEmail.innerHTML= localStorage.getItem("K2Email")