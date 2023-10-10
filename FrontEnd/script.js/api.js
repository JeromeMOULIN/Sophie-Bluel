//recuperer de l'api
fetch('http://localhost:5678/api/works').then(response => {
    return response.json();
}).then(works => {
    //création du template pour mes projet
    let templateProject = '';
    for (const work of works) {
        templateProject = templateProject + `<figure id="${work.categoryId}" class="show">
                                              <img src="${work.imageUrl}" alt="${work.title}">
                                              <figcaption>${work.title}</figcaption>
                                             </figure>`;
    }
    let templateModal = '';
    for (const work of works) {
        templateModal = templateModal + `<figure id="${work.categoryId}" class="adminWorks">
                                            <img src="${work.imageUrl}" alt="${work.title}">
                                            <button class="trash"><i class="fa-solid fa-trash-can"></i></button>
                                         </figure>`;
    }
    //injection du template dans mes projets
    document.querySelector('.gallery').insertAdjacentHTML("beforeend", templateProject);
    document.querySelector('.contentAdminGallery').insertAdjacentHTML("beforeend", templateModal)
}).catch(err => {
    console.log(err);
})

//recupération des filtres
let filters = document.querySelectorAll("#filters button");
//pour chaque filtre de mes filtres j'écoute le click

for (let filter of filters) {
    filter.addEventListener("click", () => {
        // Pour chaqu'un de met filtre je remplace la class filtreSelected si presente par [...]Unselected
        filters.forEach((filter) => filter.classList.replace("filterSelected","filterUnselected"))
        // Je change la classe de l'actuel bouton cliquer par filterSelected
        filter.classList.replace("filterUnselected","filterSelected")
        //Récupération de toute mes cartes
        let cards = document.querySelectorAll(".gallery figure")
        //Pour chaque carte de mes cartes
        for (let card of cards) {
            // je cache tout les cartes
            card.classList.replace("show", "hide")
            if (card.id === filter.id || filter.id === "all") {
                //j'affiche toute les cartes dont l'id catégorie est egale a l'id du filtre
                card.classList.replace("hide", "show")
            }
        }
    })
}
window.addEventListener('load', start);