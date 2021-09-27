let order = localStorage.getItem("order");
let prixTotal = localStorage.getItem("prixTotal");

let confirmation = `
<div class="panier-vide-block">
    <div class="container-panier-vide ">
    <div class="panier-vide-text">Votre commande <strong>n°${order}</strong> d'un montant de <strong>${prixTotal / 100}€</strong> a bien été enregistrée !</div>
    </div>
    </div>`

let elt = document.getElementById('confirmation');
elt.innerHTML += confirmation; 

localStorage.clear();