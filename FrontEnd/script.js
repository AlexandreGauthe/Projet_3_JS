// Récuperation de la gallery puis Requète GET pour récupérér les travaux via l'API //
export const gallery = document.querySelector(".gallery");
export const reponse = await fetch("http://localhost:5678/api/works").then(reponse => reponse.json());

// Récupération des différentes catégories pour générer les boutons de filtres //
const categories = reponse.map(reponse => reponse.category.name);
const categoriesID= reponse.map(reponse => reponse.category.id);
const categoriesRecuperes = Array.from (new Set(categories));
const categoriesIdRecuperes = Array.from(new Set(categoriesID));
console.log(categoriesRecuperes);
console.log(categoriesIdRecuperes);

//Génération des boutons en itérant sur les ID de catégories//
const conteneurFiltres = document.querySelector(".filters-menu");
for(let i = 0; i< categoriesIdRecuperes.length; i++){
    const bouton = document.createElement("button")
    bouton.setAttribute("id", categoriesRecuperes[i]);
    bouton.setAttribute("type", "button");
    bouton.classList.add("visible");
    bouton.innerText = categoriesRecuperes[i];
    conteneurFiltres.appendChild(bouton);
}
// Fonction pour afficher les differernts travaux depuis l'API //

export  async function actualiserTravaux(){
    gallery.innerHTML="";
    const actu = await fetch("http://localhost:5678/api/works").then(actu => actu.json());
    afficherTravaux(actu);
}


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
    })

}

// Appel de la fonction //
afficherToutTravaux();

// Fonction pour n'afficher que les objets
function afficheObjets(){

// Récuperation du bouton //    
    const btn_objets = document.getElementById("Objets");

// Ecoute du clic sur le bouton //   
    btn_objets.addEventListener("click", ()=>{
        
//  On tri la liste pour n'avoir que les objets //     
        const listeObjets = reponse.filter(function (reponse){
            return reponse.category.name === "Objets" ;
                });

//  Effacement de la gallerie et affichage de la liste triée //    
    document.querySelector(".gallery").innerHTML="";
    afficherTravaux(listeObjets);  
})

}
afficheObjets();

// Fonction pour n'afficher que les appartements
function afficheAppartements(){

// Récuperation du bouton //    
    const btn_appartement = document.getElementById("Appartements");

// Ecoute du clic sur le bouton //    
    btn_appartement.addEventListener("click", ()=>{
        
// On tri la liste pour n'avoir que les appartements //        
        const listeAppart = reponse.filter(function (reponse){
            return reponse.category.name === "Appartements" ;
                });

//  Effacement de la gallerie et affichage de la liste triée //                  
        document.querySelector(".gallery").innerHTML="";
        afficherTravaux(listeAppart);  
    })
    
}
// Appel de la fonction    
afficheAppartements();

// Fonction pour n'afficher que les hotels et restaurants
function afficherHotel(){
    
// Récuperation du bouton //    
    const btn_hotel = document.getElementById("Hotels & restaurants");

// Ecoute du clic sur le bouton //    
    btn_hotel.addEventListener("click", ()=>{
     
// On tri la liste pour n'avoir que les hotels et restaurants //        
        const listeHotel = reponse.filter(function (reponse){
            return reponse.category.name === "Hotels & restaurants" ;
                });
        
//  Effacement de la gallerie et affichage de la liste triée //          
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
