
getAllWorks().then(template => {
    
    document.querySelector('.gallery').insertAdjacentHTML("beforeend", template.templateProject);
    document.querySelector('.contentAdminGallery').insertAdjacentHTML("beforeend", template.templateModal)
})
//injection du template dans mes projets
// Modification si connecté
    // Banner EditorOn
        bannerTemplate = `<div id="editbanner">
        <i class="fa-regular fa-pen-to-square fa-xs"></i>
        <p>Mode edition</p>
        </div>`;
        if(localStorage.getItem("user") != null){
            document.body.insertAdjacentHTML("beforebegin", bannerTemplate);
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
    console.log(image)
    let title = document.getElementById('workTitle').value
    
    let category = document.getElementById('categoryOptions').value
    
    let btnformAdd = document.querySelector('#btnAddContent')
    if (image === undefined || title === '' || category === 'null') {
        btnformAdd.classList.replace('accessible','inaccessible')
    } else {
        btnformAdd.classList.replace('inaccessible','accessible')
    }
})