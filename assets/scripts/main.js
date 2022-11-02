const griglia = document.getElementById("griglia");
console.log(griglia);

function creazionequadrato(){
    const div = document.createElement("div");
    div.classList.add("quadrato");
    return div;
}
console.log(creazionequadrato());

for(let i = 1; i<=100; i++){
    
    let elementoCorrente = creazionequadrato();
    elementoCorrente.innerHTML=`${i}`

    elementoCorrente.addEventListener('click',function(){
        console.log(this);
        this.classList.toggle("active");
    })

    griglia.append(elementoCorrente);
}