import { afficherTravaux,reponse,gallery} from "./script.js";
const token =  window.localStorage.getItem("token");
const userId = window.localStorage.getItem("userId");

// Génération de la modale//
let retour = true;
const boite = document.createElement("div");
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
const iconeClose = document.querySelector(".fa-xmark");
const addMenu = document.getElementById("add-menu");
const conteneurForm = document.createElement("section");
conteneurForm.classList.add("section-addform");

//Afficher les travaux dans la modale//


// Récuperation via l'API //
const photo = await fetch("http://localhost:5678/api/works")
.then(photo => photo.json());
const travauxId = photo.map(photo =>photo.id);



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

// Gestion de l'ouverture et fermeture de la modale aux differents clics //
function afficherModal(){

    addMenu.addEventListener("click", ()=>{
        modale.classList.add("show-modal");
    })
}

function fermerModal(){

    iconeClose.addEventListener("click",()=>{
        modale.classList.remove("show-modal");
    }    
)}


// Fonction pour effacer un élément de la modale // 
function effacerTravaux(){       
    const trashes = document.querySelectorAll(".fa-trash-can");
    let ids =1;
    for(const trash of trashes){
        console.log(trash);
       
    }   
    trashes.forEach((trash)=>{
    
        trash.addEventListener('click',async event =>{
            const target = event.target;
        
        try {    
        const response = await fetch('http://localhost:5678/api/works/'+trash.dataset.id,{
        method:'DELETE',
        headers: {
                'Authorization': 'Bearer '  +token,
                'UserId' : userId
                }
                
            })
        if (response.ok){
        
            (target.closest("div").remove())
             
            const response = await reponse.json()
            
            }else{
                    console.error('Erreur lors de la supression de l\'élément');
                }}
        catch(error){
                 console.error('Erreur lors de la supression de l\'élément,');
            }
       
    })}
)}


function retourModal(conteneurForm){
        const fleche = document.querySelector(".fa-arrow-left");
        fleche.addEventListener('click', ()=>{
            conteneurForm.classList.add("hide-form");
            modale.classList.add("show-modal");
        })
}
    
function fermerAjout(conteneurForm){
    const croix = document.querySelector(".icons .fa-xmark");
    croix.addEventListener('click', ()=>{
        conteneurForm.classList.add("hide-form");
    })
}

// Fonction pour passer a la modale d'ajout de travaux //
function modalAjout(){
    const btnAjout = document.getElementById("ajout");
    btnAjout.addEventListener("click",()=>{
        retour = true;
        modale.classList.remove("show-modal");
        const formulaireAjout = `  <div class="form-ajout">
                                        <div class="icons">
                                        <i class="fa-solid fa-arrow-left"></i>
                                        <i class="fa-solid fa-xmark"></i>
                                        </div>
                                        <p class="add-title">Ajout photo</p>
                                        <form id="form-ajout" action="#">
                                            <div class="boite-image">
                                                <i class="fa-regular fa-image"></i>
                                                <label for="image" class="label-file">+ Ajouter photo</label>
                                                <input type="file" class="input-file id="image" name="image" accept="jpg, png>
                                                <img src="" alt="appercu" title="appercu" id="appercu" class="appercu"/>
                                                <span>jpg. png : 4mo max</span>
                                            </div>    
                                            <label for="titre">Titre</label>
                                            <input type="text" id="titre" name="titre">
                                            <label for="categorie">Catégorie</label>
                                            <select class="select" name="categorie" id="categorie">
                                                <option value="">--Choisissez une catégorie--</option>
                                                <option value="1">Objets</option>
                                                <option value="2">Appartements</option>
                                                <option value="3">Hotels & restaurants</option>
                                            </select>
                                            <div class=bordure>
                                                <button id="valider" type="submit">Valider</button>
                                            </div>        
                                        </form>
                                    </div>
                                `
        conteneurForm.innerHTML=formulaireAjout;
        sectionModale.appendChild(conteneurForm);
        
        // Gestion de l'ajout de travaux //
        const formEL = document.getElementById("form-ajout");
        const inputFiles =document.querySelector(".boite-image .input-file");
       
        
            formEL.addEventListener('submit', async e=>{
                e.preventDefault();
                    
                    const titre = document.getElementById('titre').value;
                    const category = document.getElementById('categorie').value;
                    const formData = new FormData();
                    
                    formData.append('image',inputFiles.files[0]);
                    formData.append('title', titre);
                    formData.append('category', category);
                    console.log(formData);
                
                try{
                
                    const response = await fetch("http://localhost:5678/api/works", {
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer '  +token,
                        
                    },
                    body: formData
    
                });
                if (response.ok) {
                    const dataResponse = await response.json();
                    
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

afficherModal();
effacerTravaux();
fermerModal();
modalAjout();





