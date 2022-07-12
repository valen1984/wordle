// pintarTablero();
// const f0c0 = document.getElementById("f0c0");
// const f0c1 = document.getElementById("f0c1");
// const f0c2 = document.getElementById("f0c2");
// const f0c3 = document.getElementById("f0c3");
// const f0c4 = document.getElementById("f0c4");
// const f1c0 = document.getElementById("f1c0");
// const f1c1 = document.getElementById("f1c1");
// const f1c2 = document.getElementById("f1c2");
// const f1c3 = document.getElementById("f1c3");
// const f1c4 = document.getElementById("f1c4");
// const f2c0 = document.getElementById("f2c0");
// const f2c1 = document.getElementById("f2c1");
// const f2c2 = document.getElementById("f2c2");
// const f2c3 = document.getElementById("f2c3");
// const f2c4 = document.getElementById("f2c4");
// const f3c0 = document.getElementById("f3c0");
// const f3c1 = document.getElementById("f3c1");
// const f3c2 = document.getElementById("f3c2");
// const f3c3 = document.getElementById("f3c3");
// const f3c4 = document.getElementById("f3c4");
// const f4c0 = document.getElementById("f4c0");
// const f4c1 = document.getElementById("f4c1");
// const f4c2 = document.getElementById("f4c2");
// const f4c3 = document.getElementById("f4c3");
// const f4c4 = document.getElementById("f4c4");
// const f5c0 = document.getElementById("f5c0");
// const f5c1 = document.getElementById("f5c1");
// const f5c2 = document.getElementById("f5c2");
// const f5c3 = document.getElementById("f5c3");
// const f5c4 = document.getElementById("f5c4");

// const fila0 = document.getElementById("fila0");
// const fila1 = document.getElementById("fila1");
// const fila2 = document.getElementById("fila2");
// const fila3 = document.getElementById("fila3");
// const fila4 = document.getElementById("fila4");
// const fila5 = document.getElementById("fila5");

// const valida0 = [`${f0c0}, ${f0c1}, ${f0c2}, ${f0c3}, ${f0c4}`];
// const valida1 = [`${f1c0}, ${f1c1}, ${f1c2}, ${f1c3}, ${f1c4}`];
// const valida2 = [`${f2c0}, ${f2c1}, ${f2c2}, ${f2c3}, ${f2c4}`];
// const valida3 = [`${f3c0}, ${f3c1}, ${f3c2}, ${f3c3}, ${f3c4}`];
// const valida4 = [`${f4c0}, ${f4c1}, ${f4c2}, ${f4c3}, ${f4c4}`];
// const valida5 = [`${f5c0}, ${f5c1}, ${f5c2}, ${f5c3}, ${f5c4}`];




// fila0.addEventListener("keyup", function () {
//     if (f0c0.value.length == 1 &&
//         f0c1.value.length == 1 &&
//         f0c2.value.length == 1 &&
//         f0c3.value.length == 1 &&
//         f0c4.value.length == 1){
//         console.log("hola")
//     }
// })

// fila0.addEventListener("keyup", function () {
//     for (var i = 0; i < valida0.length; i++) {
//         if (valida0[i].value == 1){
//             console.log("hola")
//         }
//     }
// })







/*
vamos a crear 2 funciones cuando se abre el navegador
inicio();
pintarTablero();
*/

// funcion para salgo de input




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
    inicio()
    pintarTablero()
}