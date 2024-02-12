export const gallery = document.querySelector(".gallery");
export const reponse = await fetch("http://localhost:5678/api/works").then(reponse => reponse.json());
// Fonction pour afficher les differernts travaux depuis l'API //
export function afficherTravaux(reponse){

//  Boucle for pour parcourir tout les travaux //
    for (let i = 0; i < reponse.length; i++){

//  Déclaration des variable pour traiter le travaux du tour de la boucle et créer les éléments HTML//        
        const travaux = reponse[i];
        const figure = document.createElement("figure");
        const imageTravaux = document.createElement("img");
        const titre = document.createElement("figcaption");

//  Attribution des images et des titres aux variables précédemment déclarées      
        imageTravaux.src = travaux.imageUrl;
        titre.innerText = travaux.title;

//  Placement des différents éléments ainsi récupérés dans les balises précédémment crées //        
        figure.appendChild(imageTravaux);
        figure.appendChild(titre);
        gallery.appendChild(figure);
    }    
}

// Appel de la fonction //
afficherTravaux(reponse);

// Fonction pour gérer le bouton qui affiche tout les travaux 

function afficherToutTravaux(){

// Récuperation du bouton //
    const btn_tout = document.getElementById("tous");

// Ecoute du clic sur le bouton //    
    btn_tout.addEventListener("click", () =>{

//  Effacement de la gallerie et affichage de la liste d'origine
        document.querySelector(".gallery").innerHTML="";
        afficherTravaux(reponse);
        console.log("tout les travaux sont affichés")
    })

}

// Appel de la fonction //
afficherToutTravaux();

// Fonction pour n'afficher que les objets
function afficheObjets(){

// Récuperation du bouton //    
    const btn_objets = document.getElementById("objet");

// Ecoute du clic sur le bouton //   
    btn_objets.addEventListener("click", ()=>{
        console.log("Seuls les objets sont affichés");

//  On tri la liste pour n'avoir que les objets //     
        const listeObjets = reponse.filter(function (reponse){
            return reponse.category.name === "Objets" ;
                });

//  Effacement de la gallerie et affichage de la liste triée //    
    console.log(listeObjets)        
    document.querySelector(".gallery").innerHTML="";
    afficherTravaux(listeObjets);  
})

}
afficheObjets();

// Fonction pour n'afficher que les appartements
function afficheAppartements(){

// Récuperation du bouton //    
    const btn_appartement = document.getElementById("appartement");

// Ecoute du clic sur le bouton //    
    btn_appartement.addEventListener("click", ()=>{
        console.log("Seuls les appartements sont affichés");

// On tri la liste pour n'avoir que les appartements //        
        const listeAppart = reponse.filter(function (reponse){
            return reponse.category.name === "Appartements" ;
                });

//  Effacement de la gallerie et affichage de la liste triée //                  
        console.log(listeAppart)        
        document.querySelector(".gallery").innerHTML="";
        afficherTravaux(listeAppart);  
    })
    
}
// Appel de la fonction    
afficheAppartements();

// Fonction pour n'afficher que les hotels et restaurants
function afficherHotel(){
    
// Récuperation du bouton //    
    const btn_hotel = document.getElementById("hotel");

// Ecoute du clic sur le bouton //    
    btn_hotel.addEventListener("click", ()=>{
        console.log("Seuls les hôtels et restaurants sont affichés");
        
// On tri la liste pour n'avoir que les hotels et restaurants //        
        const listeHotel = reponse.filter(function (reponse){
            return reponse.category.name === "Hotels & restaurants" ;
                });
        
//  Effacement de la gallerie et affichage de la liste triée //          
        console.log(listeHotel)        
        document.querySelector(".gallery").innerHTML="";
        afficherTravaux(listeHotel);  
    })
}

// Appel de la fonction    
afficherHotel();

// Page version admin //

const admin =document.getElementById('admin');
const filterMenu = document.querySelector('.filters-menu');
const menuModifier = document.querySelector(".section-admin .invisible");
const modale = document.querySelector(".gallery-modal");

function verifierStatut(){
    let token = window.localStorage.getItem("token");
    if (token !== null){
        admin.innerText= "Logout";
        menuModifier.classList.remove("invisible");
        filterMenu.classList.toggle("invisible");
        


    }else{ admin.innerText="Login";
        filterMenu.classList.toggle("filers-menu");
        
}}

verifierStatut();

admin.addEventListener("click",() =>{

    verifierStatut();
    if(admin.innerText ==="Logout"){
    admin.href ="index.html";
    window.localStorage.removeItem("token");
    }
})
