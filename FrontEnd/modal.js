

//Fonction pour afficher les travaux dans la modale//
async function afficherTravauxModal(){

// Récuperation via l'API //
    const photo = await fetch("http://localhost:5678/api/works").then(photo => photo.json());

// Récupération de la modale //
    const modalGrid = document.querySelector(".modal-grid");

//  Boucle for pour parcourir tout les travaux //
    for (let i = 0; i < photo.length; i++){
    
//  Déclaration des variable pour traiter le travaux du tour en cours et créer les éléments HTML//        
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
        trash.addEventListener('click',()=>{
            console.log(trash,index,"cliqué");
            fetch("http://localhost:5678/api/works/"+index,{
                method:"DELETE"
            })
        })

    });
}
afficherTravauxModal();




 