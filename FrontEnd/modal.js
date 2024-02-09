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


//Fonction pour afficher les travaux dans la modale//
async function afficherTravauxModal(){

// Récuperation via l'API //
    const photo = await fetch("http://localhost:5678/api/works").then(photo => photo.json());



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
        vignette.classList.add('vignette');
//  Attribution des images aux balises précédemment crées//      
        imageModal.src = travaux.imageUrl;
    
 //  Placement des différents éléments ainsi récupérés dans les balises précédémment crées //        
        vignette.appendChild(icone);
        vignette.appendChild(imageModal);
        modalGrid.appendChild(vignette);
        if (i > photo.length){
            return vignette;
        }
    }
    const trashes = document.querySelectorAll(".vignette i");
    trashes.forEach((trash,index)=>{
        trash.addEventListener("click",()=>{
            console.log(trash,index,"cliqué");
            fetch("http://localhost:5678/api/works/"+trash[index],{
                method:"DELETE"
            })
        })

    });
}

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
        console.log("cliqué");
        retour = true;
        modale.classList.remove("show-modal");
        const formulaireAjout = `  <div class="form-ajout">
                                        <div class="icons">
                                        <i class="fa-solid fa-arrow-left"></i>
                                        <i class="fa-solid fa-xmark"></i>
                                        </div>
                                        <p class="add-title">Ajout photo</p>
                                        <form id="form-ajout" action="#" method="POST">
                                            <div class="boite-image">
                                                <i class="fa-regular fa-image"></i>
                                                <label for="image" class="label-file">+ Ajouter photo</label>
                                                <input type="file" class="input-file id="photo" name="photo accept="jpg, png>
                                                <span>jpg. png : 4mo max</span>
                                            </div>    
                                            <label for="titre">Titre</label>
                                            <input type="text" id="titre" name="titre">
                                            <label for="categorie">Catégorie</label>
                                            <select class="select" name="categorie" id="categorie">
                                                <option value="">--Choisissez une catégorie--</option>
                                                <option value="1">Objets<option</option>
                                                <option value="2">Appartements</option>
                                                <option value="3">Hotels & restaurants</option>
                                            </select>
                                            <div class=bordure>
                                                <button id="valider" type="button">Valider</button>
                                            </div>        
                                        </form>
                                    </div>
                                `
        conteneurForm.innerHTML=formulaireAjout;
        sectionModale.appendChild(conteneurForm);
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

afficherModal()
afficherTravauxModal();
fermerModal();
modalAjout();





