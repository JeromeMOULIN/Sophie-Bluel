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
        // Si error alors on enleve le p deja present et on le remplace par un
        // message d'erreur
        document.querySelector("#error").innerHTML = error;
    }else{
        // Recupere les informations du formulaire dans des variables.
        let email = document.getElementsByName("email");
        let pwd = document.getElementsByName("pwd");
        email = email[0].value
        pwd = pwd[0].value
    }
    
})





