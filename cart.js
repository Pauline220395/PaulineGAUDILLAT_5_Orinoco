let localStorageProducts = JSON.parse(localStorage.getItem ("camera"));
console.log(localStorageProducts);

//Si le panier est vide
if(localStorageProducts === null || localStorageProducts == 0){
    let panierVide = `
    <div class="container-panier-vide">
    <div> Le panier est vide</div>
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

const btnViderLePanierHtml = `
<button class="btn_vider_le_panier"> Vider le panier</button>
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

//----------------------------------FIN Bouton vider le panier-----------------------------------------------

//----------------------------------Le montant total du panier-----------------------------------------------

//Déclaration de la variable pour y mettre les prix des items présents dans le panier
let prixTotalCalcul = [];

//Aller chercher les prix dans le panier
for (let k = 0; k < localStorageProducts.length; k++) {
    let prixProduitDansLePanier = localStorageProducts[k].price;

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
<div class="affichage-prix-html">Le prix total est de : ${prixTotal /100} € </div>`

//injection html dans la page panier

let element = document.getElementById('products__list');
element.insertAdjacentHTML("beforeend", affichagePrixHtml);

//----------------------------------------------Formulaire de contact--------------------------------------------

function afficherFormulaireHtml () {

    let structureFormulaire = `

    <label for="lastname">
      Nom : 
      <input type="text" id="lastname" class="form-control" value="">
    </label>

    <label for="firstname">
      Prénom : 
      <input type="text" id="firstname" class="form-control" value="">
    </label>

    <label for="email">
      Adresse Mail : 
      <input type="email" id="email" class="form-control" value="">
    </label>

    <label for="adress">
      Adresse : 
      <input type="text" id="adress" class="form-control" value="">
    </label>

    <label for="cp">
      Code Postal : 
      <input type="text" id="cp" class="form-control" value="">
    </label>

    <label for="city">
       Ville : 
       <input type="text" id="city" class="form-control" value="">
    </label>

    <button type="submit" class="col btn btn-primary mt-4" id="submit">
      Valider la commande
    </button>`

  let formulaire = document.getElementById('formulaire');
  formulaire.innerHTML = structureFormulaire;
};

afficherFormulaireHtml();

//Sélection du bouton valider la commande

const btnValiderCommande = document.getElementById('submit');

btnValiderCommande.addEventListener("click", function() {

//Récupération des valeurs du formulaire
    const formulaireValues = {
        lastname : document.getElementById("lastname").value,
        firstname : document.getElementById("firstname").value,
        email : document.getElementById("email").value,
        adress : document.getElementById("adress").value,
        cp : document.getElementById("cp").value,
        city : document.getElementById("city").value
    }

//Mettre l'objet "formulaireValues" dans le local storage
localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues))
 
//Mettre les values du formulaire et les produits sélectionnés dans un objet à envoyer au serveur
let aEnvoyer = {
    localStorageProducts,
    formulaireValues
}

console.log(aEnvoyer);

})

//----------------------------------------------Gestion validation du formulaire--------------------------------------------
