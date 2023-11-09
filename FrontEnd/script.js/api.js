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

//ajout de work
const addWorks = async (formData)  => {
    // Je recupere le token
    const user = JSON.parse(localStorage.getItem('user'))

    let token = user.token

    let myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + token);

    let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formData,
    }
    const reponse = await fetch('http://localhost:5678/api/works', requestOptions)
    const data = reponse.json()
    return data;
}

