// recuperer les catégorie
const getCategory = async () => {
    const response = await fetch('http://localhost:5678/api/categories')
    const categorys = await response.json();

    return {categorys}
}
//recuperer de l'api
const getAllWorks =  async () => {
    const response = await fetch('http://localhost:5678/api/works')
    const worksResponse = await response.json();
    
    return {worksResponse}
}
//Je recupere le bouton d'ajout de contenue
const bntSubmit = document.getElementById('btnAddContent')
//J'ecoute le click du bouton ajout de contenue
bntSubmit.addEventListener('click', (e) => {
    //Je previen le comportement par defaut du formulaire
    e.preventDefault()

    //Je recupere tout les information du formulaire qui sont a transmettre dans le fetch
    let image = document.getElementById('pictureLoaded').files[0]
    let url = URL.createObjectURL(image)

    let picture = document.getElementById("imageUploaded")
    
    let title = document.getElementById('workTitle').value
    
    let category = document.getElementById('categoryOptions').value
    
    // Je recupere le token
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
            .then(response => response.json())
            // Traitement de la reponse
            .then(data => {
                //reset du formulaire
                let templateAddModal = `<figure id="${data.id}"  class="adminWorks">
                    <img src="${url}" alt="${title}">
                    <button class="trash"><i class="fa-solid fa-trash-can"></i></button>
                    </figure>`;
                  
                let templateAddHome = `<figure id="${category}" data-pictureId="${data.id}" class="show ">
                    <img src="${url}" alt="${title}">
                    <figcaption>${title}</figcaption>
                    </figure>`;
                  
                document.querySelector("#adminGallery").insertAdjacentHTML("beforeend", templateAddModal)
                document.querySelector(".gallery").insertAdjacentHTML("beforeend", templateAddHome)
                document.querySelector("#adminGallery").lastElementChild.lastElementChild.addEventListener('click', workDelete)
                document.querySelector(".formAddWorks").reset()
                document.getElementById('pictureLoaded').classList.remove('hiddenModalPart')
                document.querySelector('.addImgLoader i').classList.remove('hiddenModalPart')
                document.querySelector('.addImgLoader p').classList.remove('hiddenModalPart')
                document.getElementById('btnAddContent').classList.replace('accessible','inaccessible')
                document.getElementById('btnAddContent').setAttribute('disabled', true);
                picture.src = "#"
                })
            .catch(error => console.log('error', error));
    }
})

