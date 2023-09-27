//recuperer de l'api
fetch ('http://localhost:5678/api/works').then( response =>{
    return response.json();
}).then(works =>{
    //création du template
    let template = '';
    for (const work of works){
        //console.log(work);
         template = template + `<figure id="${work.categoryId}" class="show">
         <img src="${work.imageUrl}" alt="${work.title}">
         <figcaption>${work.title}</figcaption>
         </figure>`;
    }
    //injection du template
    document.querySelector('.gallery').innerHTML= template;
}).catch(err =>{
    console.log(err);
})

let filters = document.querySelectorAll("#filters button");
for ( let filter of filters){
    filter.addEventListener("click", () =>{
        let cards = document.querySelectorAll(".gallery figure")
        for (let card of cards){
            card.classList.replace("show", "hide")
            if ( card.id === filter.id || filter.id === "all"){
                card.classList.replace("hide", "show")
            }}
    })

}










window.addEventListener('load', start)
