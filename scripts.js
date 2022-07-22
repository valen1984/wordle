let isGameOver = false

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
        inicio (); timer(true); hideBtn();
    }
}

function hideBtn() {
    document.getElementById("nueva-partida").style.visibility="hidden";
    document.getElementById("timer").style.visibility="visible";
    document.getElementById("grilla").style.visibility="visible";
    }
    
   function timer(startStop) {
    if (startStop){
        var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
        startTimer(fiveMinutes, display);
        }
        else {
            clearInterval(window.reloj);
        }
   }

   function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    window.reloj = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
                alert("Game Over; intentalo nuevamente");
                window.location.reload(true);
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
                guardarRespuesta(indice);
                
                var respuestaUsuario = respuestas[indice];
                var respuestaUsuarioString = respuestaUsuario.join('');

                if (respuestaUsuarioString == palabraGanadora){
                    alert("Crack, ganaste!"); // Resultado cuando adivinas la palabra ganadora
                    timer(false); //arranca la funcion timer
                    document.getElementById("nueva-partida").style.visibility="visible"; //Se habilita nueva partida despues que ganas
                }

                if (indice == 0 && respuestaUsuarioString != palabraGanadora){
                    document.getElementById(`fila1`).disabled=false;
                }
                if (indice == 1 && respuestaUsuarioString != palabraGanadora){
                    document.getElementById(`fila2`).disabled=false;
                }
                if (indice == 2 && respuestaUsuarioString != palabraGanadora){
                    document.getElementById(`fila3`).disabled=false;
                }
                if (indice == 3 && respuestaUsuarioString != palabraGanadora){
                    document.getElementById(`fila4`).disabled=false;
                }
                if (indice == 4 && respuestaUsuarioString != palabraGanadora){
                    document.getElementById(`fila5`).disabled=false;
                }
                if (indice == 5  && respuestaUsuarioString != palabraGanadora){
                    alert(`Game OVER! la palabra es: "${palabraGanadora}"`);
                    location.reload();
                }
            
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

// Funcion para generar palabras random

const palabrasDisponibles = ['mates']

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
    var status = pintarTablero();
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
    document.getElementById("timer").style.visibility="hidden";
    document.getElementById("grilla").style.visibility="hidden";
    }
