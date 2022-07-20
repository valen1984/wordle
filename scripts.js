function user() {
    let player = {
      // if we're reading the full name at once we should get rid of redundancy
      name: null
    }

    // here we assign the result of the prompt to name attribute of player object
    player.name = prompt("Ingresá tu nombre para jugar:");
    // honestly I don't know what empty prompt returns so I would fall back to rejecting all falsey values
    if (!player.name) {
        alert("El juego fue cancelado");
        return;
    } else {
        // Alert is definitely a better choice here as the player doesn't input any information
        alert("Perfecto, vamos a jugar " + player.name + "!");
        inicio (); timer(); hideBtn();
    }
}

function hideBtn() {
    document.getElementById("nueva-partida").style.visibility="hidden";
    document.getElementById("timer").style.visibility="visible";
    }
    
   function timer() {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
   }

   function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}


//matriz colores del tablero

var colorTablero = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
]

// necesitamos variable colores:

var colores = {
    VERDE: 1,
    AMARILLO: 2,
    GRIS: 3,
    BLANCO: 0
}

function pintarTablero(){
    for (let iFila = 0; iFila < 6; iFila++) {
        for (let iCol=0; iCol<5; iCol++){
            let input = document.getElementById(`f${iFila}c${iCol}`)
            switch(colorTablero[iFila][iCol]){
                case colores.VERDE:
                    input.classList.add("verde");
                    break;
                case colores.AMARILLO:
                    input.classList.add("amarillo");
                    break;
                case colores.GRIS:
                    input.classList.add("gris");
                    break;
                case colores.BLANCO:
                    input.classList.add("blanco");
                    break;
            }
        }
    }
}


var respuestas = [
    [],
    [],
    [],
    [],
    [],
    [],
]

function inicio () {
    for (let indice = 0; indice < 6; indice++){
        let fieldset = document.getElementById(`fila${indice}`);
        fieldset.onkeydown = function (event){
            if(event.key === `Enter`){
                //console.log('indice',indice)
                guardarRespuesta(indice)
            }
        }
    }
}


function guardarRespuesta(indice){
   // console.log(indice)
    for (let iCol = 0; iCol < 5; iCol++){
        let input = document.getElementById(`f${indice}c${iCol}`).value;
        respuestas[indice].push(input);
    }
    revisarResultado(respuestas[indice], indice);
    console.log(respuestas[indice])
}

// Funcion para generar palabras randon

const palabrasDisponibles = ['mates', 'pasto','toser']

function elegirPalabraAlAzar(palabrasDisponibles) {
    return palabrasDisponibles[Math.floor(Math.random() * palabrasDisponibles.length)]
}

var palabraGanadora = elegirPalabraAlAzar(palabrasDisponibles)

var arrayPalabraGanadora = palabraGanadora.split("")



function revisarResultado(respuesta, indice){
    respuesta.forEach(function(elemento, index){
        if(elemento === arrayPalabraGanadora[index]){
            colorTablero[indice][index] = colores.VERDE;
        }
        else if(arrayPalabraGanadora.includes(elemento)){
            colorTablero[indice][index] = colores.AMARILLO;
        }
        else if(!arrayPalabraGanadora.includes(elemento)){
            colorTablero[indice][index] = colores.GRIS;
        }
    })
    pintarTablero();
}


// salto de input

function tabular(obj, tam) {
    let frm = obj.form;
    let largo = obj.value.length;
        if (largo == tam) {
            for(i=0;i<frm.elements.length;i++) {
                if(frm.elements[i]==obj) {
                if (i==frm.elements.length-1) { i=-1; }
            break;
        }
    }

    frm.elements[i+1].focus();
    return false;

    }
    }


window.onload = function(){
    //console.log(palabraGanadora.split(""))
    inicio();
    pintarTablero();
    document.getElementById("timer").style.visibility="hidden";
    }
