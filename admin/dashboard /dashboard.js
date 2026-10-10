
// 2. Load all users
function loadAllUsers(){
    var tbody = document.getElementById("usersTableBody");
    db.collection("Users").get().then(snapshot => {
        if(snapshot.empty){
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#666;">No users found</td></tr>`;
            return;
        }
        document.getElementById("userCount").innerText = snapshot.size + " users";
        let html = "";
        let i = 1;
        snapshot.forEach(doc => {
            let d = doc.data();
            let name = d.name || d.Name || "N/A";
            let email = d.email || doc.id;
            
            let membership = d.membership;///

            html += `
            <tr>
                <td>${i++}</td>
                <td>${name}</td>
                <td>${email}</td>
                <td>${membership}</td>
            </tr>`;
        });
        tbody.innerHTML = html;
    }).catch(err => {
        tbody.innerHTML = `<tr><td colspan="5" style="color:#ff4d4d;">${err.message}</td></tr>`;
    });
}


async function loadMenService(){
    var tbody = document.getElementById("menHairBeardTableBody");
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Loading...</td></tr>`;
    
    let html = "";
    let i = 1;
    let totalCount = 0;

    try {
        // Dono collection ek saath fetch kar
        const [hairSnap, colourSnap, facialSnap,advanceFacial, hairTreatment, welnessAndRelaxation] = await Promise.all([
            db.collection("service").doc("male").collection("HAIR & BEARD").get(),
            db.collection("service").doc("male").collection("COLOUR").get(),
            db.collection("service").doc("male").collection("FACIAL").get(),
            db.collection("service").doc("male").collection("ADVANCE FACIAL").get(),
            db.collection("service").doc("male").collection("HAIR TREATMENTS").get(),
            db.collection("service").doc("male").collection("WELLNESS & RELAXATION").get()
    
    
        ]);

        // HAIR & BEARD
        hairSnap.forEach(doc => {
            let d = doc.data();
            html += `
            <tr>
                <td>${i++}</td>
                <td>Hair & Beard</td>
                <td>${doc.id}</td>
                <td>₹${d.price}</td>
            </tr>`;
        });
        totalCount += hairSnap.size;

        // COLOUR
        colourSnap.forEach(doc => {
            let d = doc.data();
            html += `
            <tr>
                <td>${i++}</td>
                <td>COLOUR</td>
                <td>${doc.id}</td>
                <td>₹${d.price}</td>
            </tr>`;
        });
        totalCount += colourSnap.size;
        
        facialSnap.forEach(doc => {
            let d = doc.data();
            html += `
            <tr>
                <td>${i++}</td>
                <td>FACIAL</td>
                <td>${doc.id}</td>
                <td>₹${d.price}</td>
            </tr>`;
        });
        totalCount += facialSnap.size;
         advanceFacial.forEach(doc => {
            let d = doc.data();
            html += `
            <tr>
                <td>${i++}</td>
                <td>ADVANCE FACIAL</td>
                <td>${doc.id}</td>
                <td>₹${d.price}</td>
            </tr>`;
         })
         totalCount += advanceFacial.size;
         hairTreatment.forEach(doc => {
             let d = doc.data();
            html += `
            <tr>
                <td>${i++}</td>
                <td>HAIR TREATMENT</td>
                <td>${doc.id}</td>
                <td>₹${d.price}</td>
            </tr>`;
        })
        totalCount += hairTreatment.size;
         welnessAndRelaxation.forEach(doc => {
                let d = doc.data();
                html += `
                <tr>
                <td>${i++}</td>
                <td>WELLNESS AND RELAXATION</td>
                <td>${doc.id}</td>
                <td>₹${d.price}</td>
                </tr>`;
        })
        totalCount += welnessAndRelaxation.size;

        if(totalCount === 0){
            tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#666;">No services found</td></tr>`;
        } else {
            tbody.innerHTML = html;
            document.getElementById("userCount").innerText = totalCount + " services";
        }

    } catch(err) {
        tbody.innerHTML = `<tr><td colspan="4" style="color:#ff4d4d;">${err.message}</td></tr>`;
    }
}

async function loadWomenService(){
    var tbody = document.getElementById("womenTableBody");
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Loading...</td></tr>`;
    
    let html = "";
    let i = 1;
    let totalCount = 0;

    try {
        
        const [hairSnap, colourSnap, facialSnap,advanceFacial, normalWaxing, ricaWaxing, nanoplasteia, threading, pedicureManicure] = await Promise.all([
            db.collection("service").doc("femalee").collection("HAIR").get(),
            db.collection("service").doc("femalee").collection("COLOUR").get(),
            db.collection("service").doc("femalee").collection("FACIAL LOTUS").get(),
            db.collection("service").doc("femalee").collection("ADVANCE FACIAL LOTUS").get(),
            db.collection("service").doc("femalee").collection("NORMAL WAXING").get(),
            db.collection("service").doc("femalee").collection("RICA WAXING").get(),
            db.collection("service").doc("femalee").collection("NANOPLASTEIA TREATMENT").get(),
            db.collection("service").doc("femalee").collection("THREADING").get(),
            db.collection("service").doc("femalee").collection("PEDICURE MANICURE").get()
    
    
        ]);

        // HAIR & BEARD
        hairSnap.forEach(doc => {
            let d = doc.data();
            html += `
            <tr>
                <td>${i++}</td>
                <td>Hair</td>
                <td>${doc.id}</td>
                <td>₹${d.price}</td>
            </tr>`;
        });
        totalCount += hairSnap.size;

        // COLOUR
        colourSnap.forEach(doc => {
            let d = doc.data();
            html += `
            <tr>
                <td>${i++}</td>
                <td>COLOUR</td>
                <td>${doc.id}</td>
                <td>₹${d.price}</td>
            </tr>`;
        });
        totalCount += colourSnap.size;
        
        facialSnap.forEach(doc => {
            let d = doc.data();
            html += `
            <tr>
                <td>${i++}</td>
                <td>FACIAL LOTUS</td>
                <td>${doc.id}</td>
                <td>₹${d.price}</td>
            </tr>`;
        });
        totalCount += facialSnap.size;
         advanceFacial.forEach(doc => {
            let d = doc.data();
            html += `
            <tr>
                <td>${i++}</td>
                <td>ADVANCE FACIAL LOTUS</td>
                <td>${doc.id}</td>
                <td>₹${d.price}</td>
            </tr>`;
         })
         totalCount += advanceFacial.size;
         normalWaxing.forEach(doc => {
             let d = doc.data();
            html += `
            <tr>
                <td>${i++}</td>
                <td>NORMAL WAXING</td>
                <td>${doc.id}</td>
                <td>₹${d.price}</td>
            </tr>`;
        })
        totalCount += normalWaxing.size;
         ricaWaxing.forEach(doc => {
                let d = doc.data();
                html += `
                <tr>
                <td>${i++}</td>
                <td>RICA WAXING</td>
                <td>${doc.id}</td>
                <td>₹${d.price}</td>
                </tr>`;
        })
        totalCount += ricaWaxing.size;
        nanoplasteia.forEach(doc => {
                let d = doc.data();
                html += `
                <tr>
                <td>${i++}</td>
                <td>NANOPLASTEIA</td>
                <td>${doc.id}</td>
                <td>₹${d.price}</td>
                </tr>`;
        })
        totalCount += nanoplasteia.size;
        threading.forEach(doc => {
                let d = doc.data();
                html += `
                <tr>
                <td>${i++}</td>
                <td>THREADING</td>
                <td>${doc.id}</td>
                <td>₹${d.price}</td>
                </tr>`;
        })
        totalCount += threading.size;
        pedicureManicure.forEach(doc => {
                let d = doc.data();
                html += `
                <tr>
                <td>${i++}</td>
                <td>PEDICURE MANICURE</td>
                <td>${doc.id}</td>
                <td>₹${d.price}</td>
                </tr>`;
        })
        totalCount += pedicureManicure.size;



        if(totalCount === 0){
            tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#666;">No services found</td></tr>`;
        } else {
            tbody.innerHTML = html;
            document.getElementById("service").innerText = totalCount + " services";
        }

    } catch(err) {
        tbody.innerHTML = `<tr><td colspan="4" style="color:#ff4d4d;">${err.message}</td></tr>`;
    }
}


// 3. Sahi logout - sirf admin keys remove
function adminLogout(){
    firebase.auth().signOut().then(() => {
        localStorage.removeItem("K2AdminEmail");
        localStorage.removeItem("isK2Admin");
        localStorage.removeItem("loginStatus");
        window.location.replace("/admin/login/");
    });
}
document.addEventListener("DOMContentLoaded", function (){
    var adminEmail=localStorage.getItem("K2AdminEmail")
    var adminStatus=localStorage.getItem("isK2Admin")
    if (adminEmail && adminStatus){
        var navbar=document.getElementById("k2-nav-left")
        navbar.innerHTML+='<button class="logout-btn">'+adminEmail+'</button>'
    }else{
        window.location.replace("/admin/login/index.html")
    }
})
loadAllUsers()
loadMenService()
loadWomenService()