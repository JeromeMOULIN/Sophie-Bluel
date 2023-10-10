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

// MODALS
let modal = null

// Open modal
const openModal = function (e) {
    e.preventDefault()
    target = document.querySelector(this.getAttribute('href'))
    target.style.visibility = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.modal-cross').addEventListener('click', closeModal)
}

// Close modal
const closeModal = function (e){
    if(modal === null) return
    e.preventDefault()
    modal.style.visibility = 'hidden'
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.modal-cross').removeEventListener('click', closeModal)
    modal = null

}

// Call modal
document.querySelectorAll('.call-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

window.addEventListener('load', start);