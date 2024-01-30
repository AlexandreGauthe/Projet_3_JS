async function afficherTravaux(){

    const gallery = document.querySelector(".gallery");
    const reponse = await fetch("http://localhost:5678/api/works");
    const reponseJS = await reponse.json();
   
    for (let i = 0; i < reponseJS.length; i++){

        const travaux = reponseJS[i];
        const figure = document.createElement("figure");
        const imageTravaux = document.createElement("img");
        imageTravaux.src = travaux.imageUrl;
    
        const titre = document.createElement("figcaption");
        titre.innerText = travaux.title;
        
        figure.appendChild(imageTravaux);
        figure.appendChild(titre);
        gallery.appendChild(figure);
    }    
}

afficherTravaux();