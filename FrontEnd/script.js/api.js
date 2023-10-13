//recuperer de l'api
const getAllWorks =  async () => {
    const response = await fetch('http://localhost:5678/api/works')
    const works = await response.json();
    
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
        return {templateProject, templateModal}
}

//recupération des filtres
let filters = document.querySelectorAll("#filters button");
//pour chaque filtre de mes filtres j'écoute le click

for (let filter of filters) {
    filter.addEventListener("click", () => {
        // Pour chaqu'un de met filtre je remplace la class filtreSelected si presente par [...]Unselected
        filters.forEach((filter) => filter.classList.replace("filterSelected", "filterUnselected"))
        // Je change la classe de l'actuel bouton cliquer par filterSelected
        filter.classList.replace("filterUnselected", "filterSelected")
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
const bntSubmit = document.getElementById('btnAddContent')
bntSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    let image = document.getElementById('pictureLoaded').files[0]
    
    let title = document.getElementById('workTitle').value
    
    let category = document.getElementById('categoryOptions').value
    
    const user = JSON.parse(localStorage.getItem('user')) 

    let token = user.token


    if (image === '' || title === '' || category === 'null') {
        console.log('error')
    } else {
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + token );

        let formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("category", category);

        // on set les options de notre requete fetch
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formData,
        }
        fetch("http://localhost:5678/api/works", requestOptions)
            // Convertie la reponse en JSON
            .then(response => response.text())
            // Traitement de la reponse
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
})