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
    <div class="row no-gutters cart-product">
    <div class="col-lg-3 col-md-4 col-xs-12 col-sm-12">
    <img src="${localStorageProducts[i].image}" class="card-img">
    </div>
    <div class="col-9">
    <div class="card-body">
    <h4>${localStorageProducts[i].name}</h4>
    <p>${localStorageProducts[i].price /100} €</p>
    <p> Quantité : ${localStorageProducts[i].quantity}</p>
    <p id="btn-supprimer" class="btn btn-danger m-0 mt-3">Supprimer</p>
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

let btn_supprimer = document.querySelectorAll('#btn-supprimer');
console.log(btn_supprimer);

for (let j = 0; j < btn_supprimer.length; j++) { //créer un tableau des boutons supprimer
  btn_supprimer[j].addEventListener('click', function() {
    
    let id_selectionner_suppression = localStorageProducts[j].product_id; //selectionné l'id dans tableau du localStorage
    console.log(id_selectionner_suppression);
    
    localStorageProducts = localStorageProducts.filter( //splice : La méthode splice() modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant de nouveaux éléments à même le tableau.On peut ainsi vider ou remplacer une partie d'un tableau.
    (elt) => elt.product_id !== id_selectionner_suppression //product_id, 1
    );
    
    localStorage.setItem("camera", JSON.stringify(localStorageProducts));
    
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
  
  //Mettre les prix du panier dans la variable "prixTotalCalcul"
  prixTotalCalcul.push(prixProduitDansLePanier)
  
  console.log("prixTotalCalcul");
  console.log(prixTotalCalcul)
} 

//Additionner les prix qu'il y a dans le tableau de la variable "prixTotalCalcul" avec la méthode .reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer,0);
console.log(prixTotal);

//Le code HTML du prix total à afficher

if(localStorageProducts === null || localStorageProducts == 0){
}
else {
  const affichagePrixHtml = `
  <div class="affichage-prix-html d-grid justify-content-md-end total-price-block"><strong>Le prix total est de : ${prixTotal /100} €</strong> </div>`
  
  //injection html dans la page panier
  
  let element = document.getElementById('products__list');
  element.insertAdjacentHTML("beforeend", affichagePrixHtml);
}

localStorage.setItem("prixTotal", JSON.stringify(prixTotal));

//----------------------------------FORMULAIRE-----------------------------------------------

function afficherFormulaireHtml () {
  
  if(localStorageProducts === null || localStorageProducts == 0){
  }
  else {
    
    let structureFormulaire = `
    
    <h2>Formulaire de commande</h2>
    
    <form>
    <label for="lastname"><span id=""></span>
    Nom : 
    <input type="text" id="lastname" class="input form-control" placeholder="Bernard" required>
    </label>
    
    <label for="firstname"><span id=""></span>
    Prénom : 
    <input type="text" id="firstname" class="input form-control" placeholder="Jean" required>
    </label>
    
    <label for="email"><span id=""></span>
    Adresse Mail : 
    <input type="email" id="email" class="form-control" placeholder="exemple@email.com" required>
    </label>
    
    <label for="address"><span id=""></span>
    Adresse : 
    <input type="text" id="address" class="form-control" placeholder="1 route des fleurs" required>
    </label>
    
    <label for="cp">
    Code Postal : 
    <input type="text" id="cp" class="form-control" placeholder="75000" required>
    </label>
    
    <label for="city"><span id=""></span>
    Ville : 
    <input type="text" id="city" class="form-control" placeholder="Paris" required>
    </label>
    
    
    <div class="d-grid gap-4 d-md-flex justify-content-md-end">
    <button type="button" class="btn btn-color mt-4" onclick="window.location.href = 'index.html'">
    Continuer vos achats
    </button>
    
    <button type="submit" class="btn btn-color mt-4" id="submit">
    Valider la commande
    </button>
    </div>
    </form>
    `;
    
    let formulaire = document.getElementById('formulaire');
    formulaire.innerHTML = structureFormulaire;
  }};
  
  afficherFormulaireHtml();
  
  //----------------------------------------------------------------------------------------//
  
  const btn_formulaire = document.getElementById('submit');
  
  btn_formulaire.addEventListener("click", (e) => {
    e.preventDefault();
    
    //recuperer les valeurs du formulaire
    
    const formulaireValues = {
      firstName: document.getElementById("firstname").value,
      lastName: document.getElementById("lastname").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
      cp: document.getElementById("cp").value,
    };
    
    //----------------------------------------------GESTION VALIDATION DU FORMULAIRE--------------------------------------------//
    
    const regExLastName = (value) => {
      return /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/.test(value);
    }
    
    function lastnameControl() {
      
      const lastName = formulaireValues.lastName;
      if(regExLastName(lastName)){
        return true;
      }else{
        
        alert("Nom non valide")
        
        return false;
      }
    };
    
    function firstnameControl() {
      
      const firstName = formulaireValues.firstName;
      if(regExLastName(firstName)){
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
    
    const regExAddress = (value) => {
      return /^(([a-zA-ZÀ-ÿ0-9_]+[\s\-][a-zA-ZÀ-ÿ0-9_]+)|([a-zA-ZÀ-ÿ0-9_]+)){1,10}$/.test(value);
    }
    
    function addressControl() {
      
      const adress = formulaireValues.address;
      if(regExAddress(adress)){
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
    
    // envoyer les donnees apres le controle
    
    if (
      lastnameControl() &&
      firstnameControl() &&
      cityControl() &&
      emailControl() &&
      addressControl() &&
      cpControl()
      ) {
        
        const envoyer = {
          products: [],
          contact: formulaireValues,
        };
        
        let objetRequest = JSON.stringify(envoyer);
        
        fetch("http://localhost:3000/api/cameras/order", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: objetRequest,
      })
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        localStorage.setItem("order", json.orderId);
        location.href = "confirmation.html";
      });
      localStorage.removeItem("camera");
    } else {
      alert("Veuillez bien remplir le formulaire");
    };
  })
