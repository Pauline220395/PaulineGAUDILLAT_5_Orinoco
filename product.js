const url_adress = window.location.href; //on va chercher adresse href="product.html?id=${products[i]._id}" dans index.js
const url = new URL(url_adress);
let product_id = url.searchParams.get("id");

//Appel API avec adresse du produit grace à l'ID

const getCamera = async function () {
    try {
        let response = await fetch('http://localhost:3000/api/cameras/' + product_id)
        if (response.ok) {
            let data = await response.json()
            cameras(data)
            stockPanier(data)
        } else {
            console.error("Retour du serveur : ", response.status)
        }
    }   catch (e) {
        console.log(e)
    }
}
 
getCamera();

function cameras(product) { //Création de la carte produit

    let cameraCard = `<div class="row mb-4">

                    <div class="card col-lg-8 col-xs-12 col-sm-12 col-md-12 px-0">
                    <img class="product-img" src="${product.imageUrl}">
                    </div>

                    <div class="col-lg-4 px-4">
                        <div class="s_product_text">
                            <h1>${product.name}</h1>
                            <h2>${product.price /100} €</h2>
                            <p>${product.description}</p>

                            <form>
                                <label for="options" class="row d-flex">
                                    <span class="col pt-2">Lentille :</span>
                                    <select name="lenses" id="optionslenses" class="form-select col"></select>
                                </label>

                                <label for="quantity" class="row d-flex mt-4">
                                    <span id="quantity-label" class="col pt-2">Quantité :</span>
                                    <input type="number" id="number" class="form-control col" min="1" value="1">
                                </label>
                            </form>                          
                        </div>
                        <div class="d-grid justify-content-md-end">
                        <button type="submit" id="btn_panier" class="btn btn-color mt-4">Ajouter au panier</button> 
                        </div>
                    </div>

                    <h2 class="mt-3">Caractéristiques</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aperiam quibusdam quaerat adipisci incidunt itaque est. Cupiditate at cumque ab ipsa nobis est molestiae enim. Laboriosam quos nisi esse qui.</p>`;

let carteProduit = document.getElementById("products__solo");

carteProduit.innerHTML = cameraCard;

/*---------------------------SELECTION DE LA LENTILLES-------------------------*/

let options = ''; //variable comprenant la recherche dans tableau lenses

for (let i = 0; i < product.lenses.length; i++) { // on parcours le tableau des lenses
    options += `<option value="${i}">${product.lenses[i]}</option>`; //Création de la ligne option value pour chaque options qui sera dans <select>
}

let optionsSelector = document.getElementById("optionslenses"); //On dit à notre ligne de se placer dans l'élément avec id optionslenses
console.log(optionsSelector)

optionsSelector.innerHTML = options; 

}

/*---------------------------ENVOYER INFOS AU PANIER-------------------------*/
       

function stockPanier(productcamera) {
    
    let btn = document.getElementById("btn_panier");
    
    btn.addEventListener('click', function () {
        
        class produit {
            constructor(image, name, price, id, quantity) {
                this.image = image;
                this.name = name;
                this.price = price;
                this.product_id = id;
                this.quantity = quantity
            }
        }
        
        let cameraCard = new produit(productcamera.imageUrl, productcamera.name, productcamera.price, productcamera._id, 1/*Lire le champs quantité*/);

        //Déclaration de la variable localStorageProducts dans laquelle on met les keys et les values qui sont dans le local storage
        let localStorageProducts = JSON.parse(localStorage.getItem ("camera"));
        //JSON.parse c'est pour convertir les données JSON en format JS
        
        //s'il y a deja des produits enregistré dans le local storage
        console.log("localStorage")
        console.log(localStorageProducts)

        if(localStorageProducts) { //ajouter un produit supplémentaire dans le local storage 

            let idInCart = localStorageProducts.findIndex((item) => item.product_id === product_id); // => fonction anonyme 
            
            console.log("localStorage pas vide")
            console.log(idInCart)

            if (idInCart >= 0) { 
                localStorageProducts[idInCart].quantity +=1 //a = a + 1
                console.log("trouvé")  
            }
               
            else { //SINON ajouter ce nouveau produit
                localStorageProducts.push(cameraCard); 
                localStorage.setItem("camera", JSON.stringify(localStorageProducts));
                console.log("PAS trouvé")  
            }
        }

        //s'il n'y a pas de produits enregistré dans le local storage
        else {
            localStorageProducts = []; //créer un tableau qui va contenir les produits
            localStorageProducts.push(cameraCard); //Mettre infos produit + carte dans le tableau
            
            console.log("localStorage vide")
        }
        
        localStorage.setItem("camera", JSON.stringify(localStorageProducts));
        //JSON.stringify c'est pour convertir les données au format JS en format JSON 
        
        window.location.href = "cart.html"
    }); 
}





