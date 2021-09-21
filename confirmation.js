let order = localStorage.getItem("order");
let prixTotal = localStorage.getItem("prixTotal");


let confirmation = `
<div class="panier-vide-block">
    <div class="container-panier-vide ">
    <div class="panier-vide-text">Votre commande n°${order} d'un montant de ${prixTotal / 100}€ a bien été enregistrée !</div>
    </div>
    </div>`

let elt = document.getElementById('confirmation');
elt.innerHTML += confirmation; 