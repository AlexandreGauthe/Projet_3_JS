// Traitement du formualire de log in //

const logIn = document.getElementById('log-in');
const messageErreur = document.getElementById('error');
const log = document.getElementById('email');
const pass = document.getElementById('password');

async function connect(chargeUtile){
    
    await fetch ("http://localhost:5678/api/users/login", {
    method:"POST",
    header:{
        "Content-Type": "application/json",
        "userId" : 1,
        "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"
        },
    body: chargeUtile
        })
}

function verifierLogs(){
    if( log.value !== "sophie.bluel@test.tld" || pass.value !== "S0phie" ){
        messageErreur.innerText ="Erreur dans l’identifiant ou le mot de passe";
        setTimeout(function(){
            messageErreur.innerText="";
        },2000)
        return false;
    }else{
        return true;
     }   
}
async function verifierAdmin(){
    if(logIn){
    logIn.addEventListener('submit',(event)=>{
        event.preventDefault();
        verifierLogs()
        while(verifierLogs === false){
            verifierLogs();
        }
        if (verifierLogs() === true){
        const charge = {
        "email" : event.target.querySelector("[name=email]").value,
        "password": event.target.querySelector("[name=password]").value
        }
        const chargeUtile = JSON.stringify(charge);
        console.log(chargeUtile);
        connect(chargeUtile);
        document.location.href="index.html";
        window.localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4");
        }})
    }};
verifierAdmin();    
        