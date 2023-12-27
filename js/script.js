
let grille = [];

let largeurGrille = 25;
let hauteurGrille = 15;
let ligneHero;
let colonneHero;

let jeuEnCours = false;

let positionHero;
let nouvelleLigneHero;
let nouvelleColonneHero;
let nouvellePositionHero;

let grilleCristaux = [];
let nombreCristauxGagne = 0;

let gauche = document.getElementById('gauche');
let droite = document.getElementById('droite');
let haut = document.getElementById('haut');
let bas = document.getElementById('bas');
let quitter = document.getElementById('quitter');


let energieInitiale = 40;
let energieCourant = energieInitiale;
let largeurProgressbar = 100;

let energieId = document.getElementById('energie');
let progressBarId = document.getElementById('progressBarGreen');

initialiserGrille();

function updateProgressBar(){
    if(energieCourant > 0){
        energieCourant--;
        largeurProgressbar = (energieCourant * 100)/energieInitiale;
        progressBarId.style.width = largeurProgressbar + '%';
        energieId.innerText = energieCourant + '/' + energieInitiale;
    }
}

function updateNombreCristaux(){
    let cristauxLabel = document.getElementById('nombreCristaux');
    nombreCristauxGagne++;
    cristauxLabel.innerText = nombreCristauxGagne;
}

function finDePartie(){
    let resultat = document.getElementById('resultat');
    let grille = document.getElementById('grille');
    grille.style.zIndex = 1;
    resultat.style.zIndex = 2;
    let cristalResultat = document.getElementById('cristalResultat');
    cristalResultat.innerText = 'Cristaux : ' + nombreCristauxGagne;
}


quitter.onclick = () =>{
    energieCourant = 0;
    finDePartie();
}

haut.onclick = function(){
    updatePositionHero(1);
}

droite.onclick = function(){
    updatePositionHero(2);
}

bas.onclick = function(){
    updatePositionHero(3);
}

gauche.onclick = function(){
    updatePositionHero(4);
}

document.onkeydown = function myFunction() {
switch (event.keyCode) {
case 38:
    updatePositionHero(1);
    console.log("Up key is pressed");
    break;
case 40:
    updatePositionHero(3);
    console.log("Down key is pressed");
    break;
case 37:
    updatePositionHero(4);
    console.log("Right key is pressed");
    break;
case 39:
    updatePositionHero(2);
    console.log("left key is pressed");
    break;
}
}


function updatePositionHero(direction){
    let ligSave = ligneHero;
    let colSave = colonneHero;

    if(energieCourant == 0){
        finDePartie();
    }

    positionHero = document.getElementById('l'+ligSave+'c'+colSave);
    switch(direction){
        case 1 :    //haut
            if(ligneHero > 0 && energieCourant > 0){
                ligneHero = ligneHero - 1;
            }
            break;
        case 2:     //droite
            if(colonneHero < largeurGrille - 1  && energieCourant > 0){
                colonneHero = colonneHero + 1;
            }
            break;
        case 3:   //bas
            if(ligneHero < hauteurGrille - 1  && energieCourant > 0){
                ligneHero = ligneHero + 1;
            }
            break;
        case 4:   //Gauche
            if(colonneHero > 0  && energieCourant > 0){
                colonneHero = colonneHero - 1;
            }
            break;
    }
    document.getElementById('l'+ligSave+'c'+colSave).src = './img/tile_vide.png';
    grille[ligSave][colSave] = 'vide';
    if(grille[ligneHero][colonneHero] == 'cristal'){
        updateProgressBar();
        updateNombreCristaux();
    }
    if(grille[ligneHero][colonneHero] == 'roche'){
        updateProgressBar();
    }
    document.getElementById('l'+ligneHero+'c'+ colonneHero).src = './img/hero.png';
}

function initialiserGrille(){

    energieInitiale = 40;
    nombreCristauxGagne = -1;
    energieCourant = energieInitiale + 1;
     updateProgressBar();
     updateNombreCristaux();
     let grilleRoche = document.getElementById('grille');
    ligneHero = Math.floor(hauteurGrille/2);
    colonneHero = Math.floor(largeurGrille/2);

    genererCristaux();
    //let grilleRoche = document.getElementById('grille');

    for(let i = 0; i < hauteurGrille; i++){
        let ligneGrille = [];
        let ligneRoche;
        grilleRoche.innerHTML += '<div id='+'l'+i+'></div>';
        for(let j = 0; j < largeurGrille; j++){

            ligneRoche = document.getElementById('l'+i);
            ligneRoche.style.display = 'flex';
            ligneRoche.style.flexDirection = 'row';

            ligneRoche.innerHTML += '<img id=l'+i+'c'+j+'></img>';

            if(grilleCristaux[i][j] == 'cristal'){
                ligneGrille[j] = 'cristal';
                document.getElementById('l'+i+'c'+j).src ='./img/tile_cristal.png';
            }
            else{
                ligneGrille[j] = 'roche';
                document.getElementById('l'+i+'c'+j).src ='./img/tile_roche.png';
            }
        } 
        grille[i] = ligneGrille;
    }
    document.getElementById('l'+ligneHero+'c'+colonneHero).src='./img/hero.png';
}

function genererCristaux(){
    let nombreCristaux = Math.floor(((largeurGrille * hauteurGrille) * 0.1)) + 1;
    for(let i = 0; i < hauteurGrille; i++){
        let ligne = [];
        for(let j = 0; j < largeurGrille; j++){
            ligne[j] = null;
        }
        grilleCristaux[i] = ligne;
    } 
    let k = 1;
    let ind1;
    let ind2;
    while(k <= nombreCristaux){
        ind1 = Math.floor(Math.random() * hauteurGrille);
        ind2 = Math.floor(Math.random() * largeurGrille);

        if(grilleCristaux[ind1][ind2] != 'cristal' && ind1 != ligneHero && ind2 != colonneHero){
            grilleCristaux[ind1][ind2] = 'cristal';
            k++;
        }
    }
}

document.getElementById('newPartie').onclick = () =>{
    let resultat = document.getElementById('resultat');
    let grille = document.getElementById('grille');
    grille.style.zIndex = 2;
    resultat.style.zIndex = 1;
    grille.innerHTML = '';

    initialiserGrille();
};
