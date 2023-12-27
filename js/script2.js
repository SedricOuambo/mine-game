let grille = [];
let grilleRoche = document.getElementById('grille');


for(let i = 0; i < 15; i++){
    let ligneGrille = [];
    let ligneRoche;
    grilleRoche.innerHTML += '<div id='+'l'+i+'></div>';
    for(let j = 0; j < 25; j++){
        ligneRoche = document.getElementById('l'+i);
        ligneRoche.style.display = 'flex';
        ligneRoche.style.flexDirection = 'row';

        ligneRoche.innerHTML += '<img id=l'+i+'c'+j+''+'></img>';

        document.getElementById('l'+i+'c'+j).src = '../img/tile_cristal.png';
    }
}
