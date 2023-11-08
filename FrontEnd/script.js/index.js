
getCategory().then(categorys => {
    let category = categorys.categorys
    let categoTemplate = `<button id="all" class="all filterSelected">Tous</button>`;
    for (const categorie of category){
        categoTemplate = categoTemplate + `<button id="${categorie.id}" class="all filterUnselected">${categorie.name}</button>`;
    }
    document.querySelector('#filters').insertAdjacentHTML('beforeend', categoTemplate)

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
})
getAllWorks().then(template => {  
    //injection du template dans mes projets 
    document.querySelector('.gallery').insertAdjacentHTML("beforeend", template.templateProject);
    document.querySelector('.contentAdminGallery').insertAdjacentHTML("beforeend", template.templateModal)
    // Ajout du system de suppression
    let delBtn = document.querySelectorAll('.trash')
    delBtn.forEach(trash => {
        trash.addEventListener('click', workDelete)
        }) 
})

// Fonction pour delete les works
const workDelete = function(){
    // Je recupere l'id de l'element parent qui a été clické (le bouton corbeil)
    let workDom = this.parentElement
    let workId = workDom.id

    const user = JSON.parse(localStorage.getItem('user')) 
    let token = user.token
            
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
    };
            
    fetch(`http://localhost:5678/api/works/${workId}`, requestOptions)
    .then(response => {
        response.text()
        workDom.remove()
        document.querySelector(`[data-pictureid='${workId}']`).remove()
    })
    .catch(error => console.log('error', error));
}
// Modification si connecté
// Banner EditorOn
bannerTemplate = `<div id="editbanner">
    <i class="fa-regular fa-pen-to-square fa-xs"></i>
    <p>Mode edition</p>
    </div>`;
if(localStorage.getItem("user") != null){
    document.body.insertAdjacentHTML("afterbegin", bannerTemplate);
}
// Login/logout
loginTemplate = `<li id="login"><a href="./logger.html">login</a></li>`
logoutTemplate = `<li id="logout"><a href="#">logout</a></li>`
if(localStorage.getItem("user") != null){
    document.getElementById("contactNav").insertAdjacentHTML("afterend", logoutTemplate);
    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("user")
        document.location.href="./index.html"
    })
}else{
    document.getElementById("contactNav").insertAdjacentHTML("afterend", loginTemplate);
}
// filtres et bouton modif
if(localStorage.getItem("user") != null){
    document.getElementById("filters").remove();      
    modifierButton = `<a id="modifButton" class="call-modal" href="#modal1">
        <i class="fa-regular fa-pen-to-square fa-xs"></i>
        <p>Modifier</p>
        </a>`;
    document.getElementById("title").insertAdjacentHTML("beforeend", modifierButton)
}

// MODALS pour identifier la modal en cour
let modal = null

// Ouvre la modal
const openModal = function (e) {
    e.preventDefault()
    target = document.querySelector(this.getAttribute('href'))
    target.style.visibility = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.modal-cross').addEventListener('click', closeModal)
    modal.querySelector('.modal-stop').addEventListener('click', stopPropagation)
}

// Ferme la modal
const closeModal = function (e){
    if(modal === null) return
    e.preventDefault()
    modal.style.visibility = 'hidden'
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.modal-cross').removeEventListener('click', closeModal)
    modal.querySelector('.modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (e){
    e.stopPropagation()
}

// Ecoute les touches du clavier qui sont pressé
window.addEventListener('keydown', function(e){
    // Ferme la modal si les touche echape est pressé
    if (e.key === "Escape" || e.key === "Esc"){
        closeModal(e)
    }
})

// Appel la modal
document.querySelectorAll('.call-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

document.getElementById('btnAddPicture').addEventListener('click', () => {
    document.getElementById('modal1Part1').classList.add('hiddenModalPart')
    document.getElementById('modal1Part2').classList.remove('hiddenModalPart')
})
document.getElementById('modalArrow').addEventListener('click', () => {
    document.getElementById('modal1Part1').classList.remove('hiddenModalPart')
    document.getElementById('modal1Part2').classList.add('hiddenModalPart')
})

//preview image
let image = document.getElementById("imageUploaded")
let previewPicture = function (e){
    const [picture] = e.files

    if(picture){
        image.src = URL.createObjectURL(picture)
    }
}

//changement de couleur/curseur du bouton d'envoi de projet
let formAdd = document.querySelector('.formAddWorks')
formAdd.addEventListener('change', () => {
    let image = document.getElementById('pictureLoaded').files[0]

    let title = document.getElementById('workTitle').value
    
    let category = document.getElementById('categoryOptions').value
    
    let btnformAdd = document.querySelector('#btnAddContent')
    if (image === undefined || title === '' || category === 'null') {
        btnformAdd.classList.replace('accessible','inaccessible')
        document.querySelector('#btnAddContent').setAttribute('disabled', true)
    } else {
        btnformAdd.classList.replace('inaccessible','accessible')
        document.querySelector('#btnAddContent').removeAttribute('disabled')
    }
    //cache le bouton lorsqu'une image est selectionné.
    if( image !== undefined){
        document.getElementById('pictureLoaded').classList.add('hiddenModalPart');
        document.querySelector('.addImgLoader i').classList.add('hiddenModalPart')
        document.querySelector('.addImgLoader p').classList.add('hiddenModalPart')
    }
})

