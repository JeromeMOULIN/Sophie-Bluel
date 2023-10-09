//Recupere et ecoute le formulaire
document.querySelector("#subForm").addEventListener("submit", (e) =>{
    // previent le comportement par defaut du formulaire
    e.preventDefault();

    let error;
    let inputsErr = document.getElementsByTagName("input");
    //Check si le nombre de champ rempli est egal au nombre de champ disponible
    for (let i = 0; i < inputsErr.length; i++){
        if (!inputsErr[i].value){
        error = "Veuillez renseigner tous les champs";
        }
    }

    if(error){
        // Si error alors on affiche un message d'erreur
        document.querySelector("#error").innerHTML = error;
        
    }else{
        // Recupere les informations du formulaire dans des variables.
        let email = document.getElementsByName("email");
        let pwd = document.getElementsByName("pwd");
        

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        let urlencoded = new URLSearchParams();
        urlencoded.append("email", email[0].value);
        urlencoded.append("password", pwd[0].value);

        // on set les options de notre requet fetch
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        
        fetch("http://localhost:5678/api/users/login", requestOptions)
            // Convertie la reponse en JSON
            .then(response => response.json())
            // Traitement de la repose
            .then(result => {
                // on recupere le token dans une variable
                const token = result.token
                // On enregistre l'es information de l'utilisateur dans le LocalStorage
                const user = {
                    email : email[0].value,
                    password : pwd[0].value,
                    token : token,
                }
                // Si l'utilisateur a bien un token
                if (user.token != null){
                    localStorage.setItem('user', JSON.stringify(user))
                     //On redirige l'utilisateur vers la page principal
                    document.location.href="./index.html"
                }
            })
            .catch(error => console.log('error', error));

    } 
})





