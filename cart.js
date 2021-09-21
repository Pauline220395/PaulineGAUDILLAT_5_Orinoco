let localStorageProducts = JSON.parse(localStorage.getItem ("camera"));
console.log(localStorageProducts);

//Si le panier est vide
if(localStorageProducts === null || localStorageProducts == 0){
    let panierVide = `
    <div class="panier-vide-block">
    <div class="container-panier-vide ">
    <div class="panier-vide-text">Votre panier est vide.</div>
    </div>
    </div>`
    ;
    
    let elt = document.getElementById('products__list'); //va chercher dans DOM élément avec id="products__list"
    elt.innerHTML += panierVide;
    
} else { //si le panier n'est pas vide : afficher les produits dans le localStorage
    
    let structureProduitPanier = [];
    
    for (i = 0; i < localStorageProducts.length; i++) { // i = un index
        
        structureProduitPanier = structureProduitPanier + 
        `<div class="card mb-3 bg-light">
        <div class="row no-gutters">
        <div class="col-3">
        <img src="${localStorageProducts[i].image}" class="card-img">
        </div>
        <div class="col-9">
        <div class="card-body">
        <h4>${localStorageProducts[i].name}</h4>
        <p>${localStorageProducts[i].price /100} €</p>
        <p> Quantité : ${localStorageProducts[i].quantity}</p>
        <p id="btn-supprimer" class="btn btn-danger">Supprimer</p>
        </div>
        </div>
        </div>
        </div>
        `;
    }
    
    if (i === localStorageProducts.length) {
        
        let elt = document.getElementById('products__list');
        elt.innerHTML += structureProduitPanier;
        
    }
}

//-----------------------------Fin de l'affichage des produits du panier------------------

//------------------------------Gestion du bouton supprimer l'article---------------------

let btn_supprimer = document.querySelectorAll('#btn-supprimer'); //chercher si getElementByIdAll existe ????
console.log(btn_supprimer);

for (let j = 0; j < btn_supprimer.length; j++) {
    btn_supprimer[j].addEventListener('click', function() {
        
        let id_selectionner_suppression = localStorageProducts[j].product_id; //Pas supprimer par id car supprime tous les éléments de cette id
        console.log(id_selectionner_suppression);
        
        localStorageProducts = localStorageProducts.filter( //splice : La méthode splice() modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant de nouveaux éléments à même le tableau.On peut ainsi vider ou remplacer une partie d'un tableau.
        (elt) => elt.product_id !== id_selectionner_suppression //product_id, 1
        );
        
        localStorage.setItem(
            "camera", JSON.stringify(localStorageProducts)
            );
            
            window.location.href = "cart.html"
        });
    }
    
    //----------------------------------Bouton vider le panier-----------------------------------------------
    
    if(localStorageProducts === null || localStorageProducts == 0){
    }
    else {
        
        const btnViderLePanierHtml = `
        <button class="btn_vider_le_panier btn btn-danger container mb-3""> Vider le panier</button>
        `;
        
        //insertion du bouton dans le HTML du panier
        let elt = document.getElementById('products__list');
        elt.insertAdjacentHTML("beforeend", btnViderLePanierHtml);
        
        //Selection du bouton "btn_vider_le_panier"
        
        const btnViderLePanier = document.querySelector(".btn_vider_le_panier");
        
        //Suppression de la key camera du localStorage
        btnViderLePanier.addEventListener('click', function() {
            
            //.removeItem pour vider le local Storage
            localStorage.removeItem("camera");
            
            window.location.href = "cart.html"
        });
    }
    
    //----------------------------------FIN Bouton vider le panier-----------------------------------------------
    
    //----------------------------------Le montant total du panier-----------------------------------------------
    
    //Déclaration de la variable pour y mettre les prix des items présents dans le panier
    let prixTotalCalcul = [];
    
    //Aller chercher les prix dans le panier
    for (let k = 0; k < localStorageProducts.length; k++) {
        let prixProduitDansLePanier = localStorageProducts[k].price;
        
        //RAJOUTER QUANTITE
        
        //Mettre les prix du panier dans la variable "prixTotalCalcul"
        prixTotalCalcul.push(prixProduitDansLePanier)
        
        console.log(prixTotalCalcul);
    } 
    
    //Additionner les prix qu'il y a dans le tableau de la variable "prixTotalCalcul" avec la méthode .reduce
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const prixTotal = prixTotalCalcul.reduce(reducer,0);
    console.log(prixTotal);
    
    //Le code HTML du prix total à afficher
    const affichagePrixHtml = `
    <div class="affichage-prix-html d-grid justify-content-md-end">Le prix total est de : ${prixTotal /100} € </div>`
    
    //injection html dans la page panier
    
    let element = document.getElementById('products__list');
    element.insertAdjacentHTML("beforeend", affichagePrixHtml);
    
    localStorage.setItem("prixTotal", JSON.stringify(prixTotal));
    
    //----------------------------------------------Formulaire de contact--------------------------------------------
    
    function afficherFormulaireHtml () {
        
        let structureFormulaire = `
        
        <h2 class="formulaire-title mt-4">Passer commande</h2>
        
        <form>
        <label for="lastname">
        Nom : 
        <input type="text" id="lastname" class="form-control" value="" placeholder="Bernard" required>
        </label>
        
        <label for="firstname">
        Prénom : 
        <input type="text" id="firstname" class="form-control" value="" placeholder="Jean" required>
        </label>
        
        <label for="email"></label>
        Adresse Mail : 
        <input type="email" id="email" class="form-control" placeholder="exemple@email.com" required>
        
        <label for="adress">
        Adresse : 
        <input type="text" id="adress" class="form-control" value="" placeholder="1 route des fleurs" required>
        </label>
        
        <label for="cp">
        Code Postal : 
        <input type="text" id="cp" class="form-control" value="" placeholder="75000" required>
        </label>
        
        <label for="city">
        Ville : 
        <input type="text" id="city" class="form-control" value="" placeholder="Paris" required>
        </label>
        
        <div class="d-grid gap-4 d-md-flex justify-content-md-end">
        <button type="button" class="btn btn-color mt-4" onclick="window.location.href = 'index.html'">
        Continuer vos achats
        </button>
        
        <button type="submit" class="btn btn-color mt-4" id="submit">
        Valider la commande
        </button>
        </div>
        </form>`
        
        let formulaire = document.getElementById('formulaire');
        formulaire.innerHTML = structureFormulaire;
    };
    
    afficherFormulaireHtml();
    
    //Sélection du bouton valider la commande
    
    const btnValiderCommande = document.getElementById('submit');
    
    btnValiderCommande.addEventListener("click", function(e) {
        e.preventDefault();
        
        //Récupération des valeurs du formulaire
        const formulaireValues = {
            lastname : document.getElementById("lastname").value,
            firstname : document.getElementById("firstname").value,
            email : document.getElementById("email").value,
            adress : document.getElementById("adress").value,
            cp : document.getElementById("cp").value,
            city : document.getElementById("city").value
        }
        
        //----------------------------------------------GESTION VALIDATION DU FORMULAIRE--------------------------------------------//
        
        //A ranger dans une class ?
        
        const regExLastFirst = (value) => {
            return /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/.test(value);
        }
        
        function lastControl() {
            
            const lastName = formulaireValues.lastname;
            if(regExLastFirst(lastName)){
                return true;
            }else{
                
                alert("Nom non valide")
                
                return false;
            }
        };
        
        function firstControl() {
            
            const firstName = formulaireValues.firstname;
            if(regExLastFirst(firstName)){
                return true;
            }else{
                
                alert("Prénom non valide")
                return false;
            }
        };
        
        const regExEmail = (value) => {
            return /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/.test(value);
        }
        
        function emailControl() {
            
            const email = formulaireValues.email;
            if(regExEmail(email)){
                return true;
            }else{
                
                alert("Adresse mail non valide")
                return false;
            }
        };
        
        const regExAdress = (value) => {
            return /^(([a-zA-ZÀ-ÿ0-9_]+[\s\-][a-zA-ZÀ-ÿ0-9_]+)|([a-zA-ZÀ-ÿ0-9_]+)){1,10}$/.test(value);
        }
        
        function adressControl() {
            
            const adress = formulaireValues.adress;
            if(regExAdress(adress)){
                return true;
            }else{
                
                alert("Adresse non valide")
                return false;
            }
        };
        
        
        const regExCp = (value) => {
            return /^[0-9]{5}$/.test(value);
        }
        
        function cpControl() {
            
            const cp = formulaireValues.cp;
            if(regExCp(cp)){
                return true;
            }else{
                
                alert("Code postal non valide")
                return false;
            }
        };
        
        const regExCity = (value) => {
            return /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/.test(value);
        }
        
        function cityControl() {
            
            const city = formulaireValues.city;
            if(regExCity(city)){
                return true;
            }else{
                
                alert("ville non valide")
                return false;
            }
        }
        
        
        //-------------------------------------------FIN - GESTION VALIDATION DU FORMULAIRE-----------------------------------------//
        
        if (localStorageProducts === null) {
            
            alert("Votre panier est vide");
            
        } else {
            
            if(lastControl() && firstControl() && emailControl() && adressControl() && cpControl() && cityControl()){
                //Mettre l'objet "formulaireValues" dans le local storage
                localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
                              
                let aEnvoyer = {
                    formulaireValues,
                    prixTotal
                };
                
                let promise = JSON.stringify(aEnvoyer);
                
                fetch ("http://localhost:3000/api/cameras/order", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: promise,
            })
            .then((data) => {
                return data.json();
            })
            .then((json) => {
                localStorage.setItem("order", json.orderId);
                location.href = "confirmation.html";
            });
            localStorage.removeItem("camera");
            
        }else{
            
            alert("Veuillez bien remplir le formulaire"); 
            
        };
    }
    
    //Mettre les values du formulaire et les produits sélectionnés dans un objet à envoyer au serveur
});

//----------------------------------------------Gestion validation du formulaire--------------------------------------------

