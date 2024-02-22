// Import des Varialbes et fonctions nécéssaires//
import {actualiserTravaux,categoriesIdRecuperes,categoriesRecuperes} from "./script.js";

// Récupération du token depuis le LocalStorage//
const token =  window.localStorage.getItem("token");

const iconeBandeau = document.getElementById("modif");
const galleriePrinc = document.querySelector(".gallery");
const portfolio = document.getElementById("portfolio");
const intro = document.getElementById("introduction");

// Génération de la modale et des differents éléments nécéssaire à celle-çi//
let retour = true;
const boite = document.createElement("div");
boite.setAttribute('id','boite');
const modalModif =`
                            <div class="gallery-modal">
                                <i class="fa-solid fa-xmark"></i>
                                <p>Galerie photo</p>
                            <div class="modal-grid">
    
                            </div>
                            <button id="ajout" type="button">Ajouter une photo</button>
                            </div>
                `;
const sectionModale = document.querySelector(".modal");
boite.innerHTML=modalModif;
sectionModale.appendChild(boite);
const modale = document.querySelector(".gallery-modal");
modale.setAttribute('id', 'modpic');
const iconeClose = document.querySelector(".fa-xmark");
const addMenu = document.getElementById("add-menu");
const conteneurForm = document.createElement("section");
conteneurForm.classList.add("section-addform");

//Afficher les travaux dans la modale//
async function afficherTravauxModal(){
// Récuperation via l'API //
const photo = await fetch("http://localhost:5678/api/works")
.then(photo => photo.json());

//  Boucle for pour parcourir tout les travaux //
    for (let i = 0; i < photo.length; i++){
    
//  Déclaration des variable pour traiter le travaux du tour en cours et créer les éléments HTML//        
        const modalGrid = document.querySelector(".modal-grid");
        const travaux = photo[i];
        const vignette = document.createElement("div");
        const imageModal = document.createElement("img");
        const icone = document.createElement("i");
        icone.classList.add('fa-solid');
        icone.classList.add('fa-trash-can');
        icone.dataset.id = photo[i].id;
        vignette.classList.add('vignette');
//  Attribution des images aux balises précédemment crées//      
        imageModal.src = travaux.imageUrl;
    
 //  Placement des différents éléments ainsi récupérés dans les balises précédémment crées //        
        vignette.appendChild(icone);
        vignette.appendChild(imageModal);
        modalGrid.appendChild(vignette);
    }
    effacerTravaux();
}
// Gestion de l'ouverture et fermeture de la modale aux differents clics //
export function afficherModal(){

    addMenu.addEventListener("click", ()=>{
        modale.classList.add("show-modal");   
    })
}


function fermerModal(){

    document.addEventListener("click",(e)=>{
        let elemClick = e.target;
        
            if (elemClick === iconeClose){
                modale.classList.remove("show-modal");
            }
            else if (elemClick === galleriePrinc || elemClick === portfolio || elemClick === intro){
               modale.classList.remove("show-modal");
              
            }
})}

// Affichage de la modale via le bandeau //
function afficherModalBandeau(){
    if (iconeBandeau){
        iconeBandeau.addEventListener("click", ()=>{
        modale.classList.add("show-modal");
        })
    }
}


// Fonction pour effacer un élément de la modale // 
function effacerTravaux(){       
    const trashes = document.querySelectorAll(".fa-trash-can");
    trashes.forEach((trash)=>{
        trash.addEventListener('click',async event =>{
            const target = event.target;
        
        try {    
        const response = await fetch('http://localhost:5678/api/works/'+trash.dataset.id,{
        method:'DELETE',
        headers: {
                'Authorization': 'Bearer '  +token
                }
                
            })
        if (response.ok){
        
            (target.closest("div").remove())
            actualiserTravaux();
             
            }}
        catch(error){
                 console.error('Erreur lors de la supression de l\'élément,');
            }
    })}
)}

// Retour sur la modal pour effacer les travaux au clic sur la fleche //
function retourModal(conteneurForm){
        const fleche = document.querySelector(".fa-arrow-left");
        fleche.addEventListener('click', ()=>{
            conteneurForm.classList.add("hide-form");
            modale.classList.add("show-modal");
        })
}

// Fermeture de la modale d'ajout au clic sur la croix //
function fermerAjout(conteneurForm){
    const croix = document.querySelector(".icons .fa-xmark");
    croix.addEventListener('click', ()=>{
        conteneurForm.classList.add("hide-form");
    })
}

// Fonction pour actualiser la grille des travaux de la modal avec la liste de l'API //
async function actualiserTravauxModal(){
    const modalGrid = document.querySelector(".modal-grid");
    modalGrid.innerHTML="";
    const actu = await fetch("http://localhost:5678/api/works").then(actu => actu.json());
    afficherTravauxModal(actu);
}

// Fonction pour passer a la modale d'ajout de travaux //
function modalAjout(){
    const btnAjout = document.getElementById("ajout");
    btnAjout.addEventListener("click",()=>{
        retour = true;
        modale.classList.remove("show-modal");
        const formulaireAjout = `  <div class="form-add">
                                        <div class="icons">
                                            <i class="fa-solid fa-arrow-left"></i>
                                            <i class="fa-solid fa-xmark"></i>
                                        </div>
                                        <p class="add-title">Ajout photo<p>
                                        <form class="form-ajout" id="form-ajout" action="#">
                                            <div class="boite-image" id="boite-image">
                                                <img id="appercu" class="invisible" src="" alt="">
                                                <i class="fa-regular fa-image"></i>
                                                <label for="image" class="label-file">+ Ajouter photo</label>
                                                <input type="file" class="input-file id="image" name="image" accept="jpg,png">
                                                <span>jpg. png : 4mo max</span> 
                                            </div>
                                            <label for="titre">Titre</label>
                                            <input type="text" id="titre" name="titre">
                                            <label for="categorie">Catégorie</label>
                                            <select class="select" name="categorie" id="categorie">
                                                <option value="">--Choisissez une catégorie--</option>
                                            </select>
                                            <div class="bordure">
                                                <p id="form-error"><p>
                                                <button id="valider" type="submit">Valider</button>
                                            </div>
                                                   
                                        </form>
                                    </div>
                                `
        conteneurForm.innerHTML=formulaireAjout;
        sectionModale.appendChild(conteneurForm);
        
        // Ajout des différents catégories via l'API //
        const selecteur = document.querySelector(".select");
        for (let i = 0; i < categoriesIdRecuperes.length; i++){
                const categorie = document.createElement("option");
                categorie.setAttribute("value", categoriesIdRecuperes[i]);
                categorie.innerText=categoriesRecuperes[i];
                selecteur.appendChild(categorie);
                }
        
        

        // Gestion de l'ajout de travaux //
        const formEL = document.getElementById("form-ajout");
        const inputFiles =document.querySelector(".boite-image .input-file");
        const appercu = document.getElementById("appercu");
        const iconeImage = document.querySelector(".fa-image");
        const span = document.querySelector(".form-ajout span");
        const titreAjout = document.querySelector(".form-ajout .label-file");
        const champTitre = document.getElementById("titre");
        const champCategorie = document.getElementById("categorie");
        const formError = document.getElementById("form-error") ;
        
       
        inputFiles.addEventListener('change',(chargement)=>{
                    appercu.classList.remove("invisible");
                    const pict = chargement.target.files[0];
                    appercu.src = URL.createObjectURL(pict);
                    iconeImage.classList.add("invisible");
                    span.classList.add("invisible");
                    titreAjout.classList.remove("label-file");
                    titreAjout.innerText = "";
                    titreAjout.classList.add("invisible");
                })
        
            formEL.addEventListener('submit', async e=>{
                e.preventDefault();
                    
                    const titre = document.getElementById('titre').value;
                    const category = document.getElementById('categorie').value;
                    const formData = new FormData();
                    formData.append('image',inputFiles.files[0]);
                    formData.append('title', titre);
                    formData.append('category', category);
                    
                    // Vérification des champs //
                    if(titre === "" || category === "" || inputFiles.files[0] === undefined){
                        formError.innerText="Un ou plusieurs champs ne sont pas remplis"
                        setTimeout(function(){
                            formError.innerText="";
                        },2000);
                    }
                  
                
                try{
                
                    const response = await fetch("http://localhost:5678/api/works", {
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer '  +token,
                        
                    },
                    body: formData
    
                });
                if (response.ok) {
                    await response.json();
                    actualiserTravaux();
                    actualiserTravauxModal();
                    appercu.classList.add("invisible");
                    iconeImage.classList.remove("invisible");
                    span.classList.remove("invisible");
                    titreAjout.classList.add("label-file");
                    titreAjout.innerText = "Ajout photo";
                    titreAjout.classList.remove("invisible");
                    champTitre.value="";
                    champCategorie.value="";
                }
            }catch(error){
                console.log("une erreur c'est produite lors de la requête :", error);
            }
                
        })
        
        // Gestion du passage d'une modale à l'autre //
        while(retour === true){
        retourModal(conteneurForm)
        retour = false;
        }
        if(retour === false){
            conteneurForm.classList.remove("hide-form");
            fermerAjout(conteneurForm);
        }
    })
}
// Appels des fonctions//
afficherTravauxModal();
afficherModal();
fermerModal();
afficherModalBandeau();
modalAjout();





