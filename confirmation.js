let order = localStorage.getItem("order");


let confirmation = `
<div class="panier-vide-block">
    <div class="container-panier-vide ">
    <div class="panier-vide-text">Votre commande n°${order} d'un montant de []€ a bien été enregistrée !</div>
    </div>
    </div>`

let elt = document.getElementById('confirmation');
elt.innerHTML += confirmation; 