// Traitement du formualire de log in //
const logIn = document.getElementById('log-in');
const btnConnexion = document.getElementById('connexion');
const messageErreur = document.getElementById('error');
const log = document.getElementById('email');
const pass = document.getElementById('password');

//async function connect(chargeUtile){
    
  //  fetch ("http://localhost:5678/api/users/login", {
    //method:"POST",
    //header:{
      //  "Content-Type": "application/json",
        //'Access-Control-Allow-Origin':'*'
        //},
    //body: chargeUtile
      //  })
    //.then(answer => answer.json());
   // }

//function verifierLogs(){
    //if( log.value !== "sophie.bluel@test.tld" || pass.value !== "S0phie" ){
       // messageErreur.innerText ="Erreur dans l’identifiant ou le mot de passe";
       // setTimeout(function(){
         //   messageErreur.innerText="";
        //},2000)
       // return false;
    //}else{
      //  return true;
     //}   
//}
    function verifierAdmin(){
    btnConnexion.addEventListener('click',(event)=>{
        event.preventDefault()
        console.log("test")
        const charge ={
          "email" : document.getElementById('email').value,
          "password": document.getElementById('password').value
        }
        const chargeUtile = JSON.stringify(charge);
        const promesse = fetch ("http://localhost:5678/api/users/login",{
        method:"POST",
        mode: "no-cors",
        header:{
        "Content-Type": "application/json"
        },
        
        body: chargeUtile 
      })
        console.log(chargeUtile);
        console.log(promesse);
        console.log(log.value);
        console.log(pass.value);
        //verifierLogs()
        //while(verifierLogs === false){
        //verifierLogs();
        //}
        //if (verifierLogs() === true){
       // const charge = {
        //"email" : logIn.log.value,
        //"password": logIn.log.value
        //}
        //const chargeUtile = JSON.stringify(charge)
        promesse.then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            alert("Error Password or Username"); /*displays error message*/
          } else {
            window.open(
              "target.html"
            ); /*opens the target page while Id & password matches*/
          }
        })
        .catch((err) => {
          console.log(err);
        });
})}                
        //document.location.href="index.html";
        //window.localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4");
verifierAdmin();    
        