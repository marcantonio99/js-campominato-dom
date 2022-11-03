//Seleziono la select della difficolta
let difficolta = document.getElementById('difficolta');
//seleziono griglia nell'html
const griglia = document.getElementById('griglia');
//bomba numero random
let bomba;
//array di bombe compilato dalla funzione
let bombe = [];
//seleziono il div frase custom
let frase = document.getElementById('punteggio');
//creo un contatore per il punteggio
let contatore = 0;
//Variabile di controllo fine gioco
let isGameOver = false;

//quadrato griglia
function creazioneQuadrato(num) {
    const div = document.createElement('div');
    div.classList.add('quadrato');
     //inseriamo il numero dentro il div
  div.innerHTML = `<span>${num}</span>`;
  return div; //<div class="quadrato">.....</div>
}

difficolta.addEventListener('change', function () {

    let difficoltaValue = difficolta.value;
    creaGioco(difficoltaValue)
})

//funzione cambio celle in base alla difficolta`
function creaGioco(livelloDiDifficolta) {
    if (livelloDiDifficolta == '1') {
      bombe = [];
      generaBombe(1,100)
      console.log(bombe)
      creaCelle(100)
    } else if (livelloDiDifficolta == '2') {
      bombe = [];
      generaBombe(1,81)
      console.log(bombe)
      
      creaCelle(81)
    } else if (livelloDiDifficolta == '3') {
      generaBombe(1,49)
      console.log(bombe)
    
      creaCelle(49)
    }
}

//funzione crea celle
function creaCelle(numeroCelle) {

    //Pulisco la griglia
    griglia.innerHTML = '';
    frase.innerHTML = '';
    isGameOver = false;
  
    for (let i = 1; i <= numeroCelle; i++) {
  
      let elementoCorrente = creazioneQuadrato(i);
      //console.log(elementoCorrente);
      elementoCorrente.addEventListener('click', function () {
        let numeroNellaCella = parseInt(this.firstChild.innerHTML)
        if ( !isGameOver ) {
            if ( bombe.includes(numeroNellaCella )) {
              //Se becco la bomba
              //al click della cella viene aggiunta la classe "bomba" per lo sfondo rosso che segna la sconfitta
              this.classList.toggle('bomba');
               //ciclo tutte le celle da zero e controllo quali sono le bombe, ogni volta che ne trovo una aggiungo la classe "bomba"
          for (let y = 0; y < numeroCelle; y++) {
            if ( bombe.includes( parseInt(griglia.children[y].firstChild.innerHTML )) ) {
              griglia.children[y].classList.add('bomba');
            }
          }
          //Cambio la variabile di controllo per non per avere più accesso alle funzioni al click e terminare così la partita
          isGameOver = true;
          frase.innerHTML = `<p>La partita è terminata hai perso, il tuo punteggio finale è: ${contatore}</p>`
        } else {
          //Se non becco la bomba
          //al click della cella viene aggiunta la classe "salvo" perchè non era una bomba
          this.classList.toggle('salvo');
          //aumento il punteggio ogni volta che non clicco su una bomba
          contatore++;
        }
      }


    })

    griglia.append(elementoCorrente);

  }
}

//logica gioco
function generaBombe(bombaMin, bombaMax) {
    for (let k = 0; k < 16; k++) {
      do {
        bomba = getRandomInt(bombaMin, bombaMax)
      } while (bombe.includes(bomba));
  
      bombe.push(bomba);
    }
}

//funzione genera numero min e max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
