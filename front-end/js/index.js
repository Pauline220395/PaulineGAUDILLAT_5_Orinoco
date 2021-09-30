//-----------------------------APPEL DE L'API-----------------------------

const getProducts = async function () {
    try {
        let response = await fetch('http://localhost:3000/api/cameras')
        if (response.ok) {
            let data = await response.json()
            console.log(data)  
            items(data) //function items
        } else {
            console.error("Retour du serveur : ", response.status)
        }
    }   catch (e) {
        console.log(e)
    }
}

getProducts();

//-----------------------------AFFICHAGE DES PRODUITS---------------------------

function items(products) {
    
    for (let i = 0; i < products.length; i++) { //Boucle for, déclarer let i = 0 (=compteur) -> condition i < au nbr d'ele dans tableau -> puis incrémenté i pour parcourir ele tableau
        //dot notation
        
        let content = `<div class="col-md-6 col-xl-4 mt-2">
        <div class="card picture mb-3">
        <a id="${products[i]._id}" href="product.html?id=${products[i]._id}"> 
        <img src="${products[i].imageUrl}">
        <div class="card-text">    
        <h2>${products[i].name}</h2>
        <p>${products[i].price /100} €</p>
        </div>              
        </a>
        </div>
        </div>`;
        
        let elt = document.getElementById('products__list'); //va chercher dans DOM élément avec id="products__list"
        
        elt.innerHTML += content;
        
    }
}
