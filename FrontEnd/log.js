
function verifierLogs(){
    let messageErreur = document.getElementById('error');
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
// Traitement du formualire de log in //

document.addEventListener('DOMContentLoaded', ()=>{
    let messageErreur = document.getElementById('error');
    let logIn = document.querySelector('form');
    let log = document.getElementById('email');
    let pass = document.getElementById('password');
    let btnSubmit = document.getElementById('connexion');
    console.log(btnSubmit);
    btnSubmit.addEventListener('click', async event =>{
        event.preventDefault();
        if (verifierLogs){
            const connection = {
                email: log.value,
                password: pass.value
            };

            try {
                const response = await fetch('http://localhost:5678/api/users/login', {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(connection)

                });
                
                if (response.ok) {
                    const dataResponse = await response.json();
                    localStorage.setItem("token", dataResponse.token);
                    localStorage.setItem("userId", dataResponse.userId);
                    window.location.href = "index.html";
                } else {
                    messageErreur.innerText = "Adresse mail ou mot de passe incorrect";
                }
            } catch (error){
                console.error("Une erreur s'est produite lors de la requête :", error);
            }
        } else{
                messageErreur.innerText = "Format de l'email incorrect";
            }    
            
        });
    
});   
