// Traitement du formualire de log in //

const logIn = document.getElementById('log-in');
const messageErreur = document.getElementById('error');
const log = document.getElementById('email');
const pass = document.getElementById('password');
async function connect(chargeUtile){
    await fetch ("http://localhost:5678/api/users/login", {
        method:"POST",
        header:{
            "Content-Type": "application/json"
            },
        body: chargeUtile
        })
        .then(response => response.json())
        .then(charge => console.log(charge));
}


logIn.addEventListener('submit',(event)=>{
    event.preventDefault();
    if ( log.value !== "sophie.bluel@test.tld" || pass.value !== "S0phie" ){
        messageErreur.innerText ="Erreur dans l’identifiant ou le mot de passe";
    }else{ 
        const charge = {
        "email": "sophie.bluel@test.tld",
        "password": "S0phie"
        };
        const chargeUtile = JSON.stringify(charge);
        connect(chargeUtile);
        document.location.href="index.html";
        window.localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4");
    }});
        