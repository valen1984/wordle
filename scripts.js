//window.fila = 0

// Testeo funcionalidad estableciendo una variable para el nombre en un alert y guardo en LS una key 'nombre'. 
// Ejecuto el juego, timer y escondo el boton de nueva partida.
/* function user() {
    let player = {
      name: null
    }

    // here we assign the result of the prompt to name attribute of player object
    player.name = prompt("Ingresá tu nombre para jugar:"); // Lo voy a usar para guardar el nombre en el tablero
    // honestly I don't know what empty prompt returns so I would fall back to rejecting all falsey values
    //localStorage.setItem('nombre', player.name);
    //obtenerSaves(player.value);
    if (!player.name) {
        alert("El juego fue cancelado");
        return;
    } else {
        // Alert is definitely a better choice here as the player doesn't input any information
        alert("Perfecto, vamos a jugar " + player.name + "!");
        localStorage.setItem('nombre', player.name, JSON.stringify(puntajes));
        inicio (); timer(true); hideBtn();
    }
}
*/

// Movi la funcion al window.onload
/*function hideBtn() {
    document.getElementById("nueva-partida").style.visibility="hidden";
    document.getElementById("timer").style.visibility="visible";
    document.getElementById("grilla").style.visibility="visible";
    }
*/

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


function GuardarProgreso(){

    //Declaro un array "save" y le guardo los datos necesarios para poder continuar jugando en otro momento
    let save = {};

    save.fecha = new Date().toLocaleString("es-AR", {timeZone:"America/Argentina/Buenos_Aires"});
    save.tiempo = document.querySelector("#time").innerHTML;
    save.respuestas = respuestas;
    save.usuario = document.getElementById("nombre-jugador-input").value;
    save.palabraGanadora = palabraGanadora;
    save.colorTablero = colorTablero; // me va a pintar la matriz como estaba


    //Traigo del localStorage el array "saves", si no esta le asigno "[]"
    let savesArray = JSON.parse(localStorage.getItem("saves")) || [];
    savesArray.push(save);
    //Convierto mi array de saves a json
    let savesArrayJSON = JSON.stringify(savesArray);
    //Guardo mi array de saves en formato JSON en el local storage
    localStorage.setItem("saves", savesArrayJSON);

    // console.log(savesArray)
    window.location.href = "../index.html";
}

const loadGame = function(indice){
    gameOver = false;
    let modal = document.getElementById("modalPartidas");
    modal.style.display = "none";

    for (let indice = 0; indice < 6; indice++){
        let fieldset = document.getElementById(`fila${indice}`);
        fieldset.disabled=false;
    }

    // Traigo del localStorage el array "saves"
    let savesArray = JSON.parse(localStorage.getItem('saves'));

    let actualArray = savesArray[indice].respuestas;
    let actualPalabra = savesArray[indice].palabraGanadora;
    let actualTiempo = savesArray[indice].tiempo
    let actualUsuario = savesArray[indice].usuario;
    let actualColorTablero = savesArray[indice].colorTablero;

    colorTablero = actualColorTablero;

    //guardarRespuestaPartidaCargada(indice)

    pintarTablero();

    palabraGanadora = actualPalabra;
    document.querySelector("#time").innerHTML = actualTiempo;
    document.getElementById("nombre-jugador-input").value = actualUsuario;


    //Escribo en valores obtenidos en input
    for (let iFila = 0; iFila < 6; iFila++) {
        for (let iCol=0; iCol<5; iCol++){
            let input = document.getElementById(`f${iFila}c${iCol}`);
            if(actualArray[iFila][iCol] !== undefined){
            input.value = actualArray[iFila][iCol];
            }
        }
    }

    console.log(actualPalabra);
    console.log(actualTiempo);
    console.log(actualUsuario);

    hideBtn();
    mensajeDeErrorValor();

    //Realcular tiempo
    let sec = actualTiempo.slice(3);
    let min = actualTiempo.slice(0, 2);
    let secTransform = Math.round((sec/60) * 100);
    let calculoTiempo = Math.round(((min + secTransform) /100) * 60);
    var timer = calculoTiempo;
    display = document.querySelector("#time");
    startTimer(timer, display);


    //misma funcion pero al cargar partidas (con palabra actual)
    function guardarRespuestaPartidaCargada(indice){
        for (let iCol = 0; iCol < 5; iCol++){
            let input = document.getElementById(`f${indice}c${iCol}`).value;
            respuestas[indice].push(input);
        }
        revisarResultadoPartidaCargada(respuestas[indice], indice);
    }

    function revisarResultadoPartidaCargada(respuesta, indice){
        respuesta.forEach(function(elemento, index){
            if(elemento === arrayActualPalabra[index]){
                colorTablero[indice][index] = colores.VERDE;
            }
            else if(arrayActualPalabra.includes(elemento)){
                colorTablero[indice][index] = colores.AMARILLO;
            }
            else if(!arrayActualPalabra.includes(elemento)){
                colorTablero[indice][index] = colores.GRIS;
            }
        })
        pintarTablero();
    }

    arrayActualPalabra = actualPalabra.split("");


    //Guarla la respuesta de la partida solo de las filas  guardadas
    for (let indice = 0; indice < 6; indice++){
        let fieldset = document.getElementById(`fila${indice}`);
        let validarCaracter = document.querySelectorAll(`#fila${indice} input`);

        let valor0 = validarCaracter[0].value;
        let valor1 = validarCaracter[1].value;
        let valor2 = validarCaracter[2].value;
        let valor3 = validarCaracter[3].value;
        let valor4 = validarCaracter[4].value;

        //condicional para que no impacte guardarRespuestaPartidaCargada en espacios vacios
        if (valor0 !== "" && valor1 !== "" && valor2 !== "" && valor3 !== ""&& valor4 !== ""){
            guardarRespuestaPartidaCargada(indice);
            fieldset.disabled=true;
        }
        if (valor0 == ""){
            validarCaracter[0].focus();
            break //se posiciona en la primer fila vacia
        }
    }

    //Funcion inicio() modificada para partida guardada
    for (let indice = 0; indice < 6; indice++){
        let fieldset = document.getElementById(`fila${indice}`);
        fieldset.onkeydown = function (event){//el resto del juego guardarRespuesta con enter
            if(event.key === `Enter`){
                let validarCaracter = document.querySelectorAll(`#fila${indice} input`);
                var regex = new RegExp ("[A-Z]");
                let valor0 = validarCaracter[0].value;
                let valor1 = validarCaracter[1].value;
                let valor2 = validarCaracter[2].value;
                let valor3 = validarCaracter[3].value;
                let valor4 = validarCaracter[4].value;

                let input0 = regex.test(valor0);
                let input1 = regex.test(valor1);
                let input2 = regex.test(valor2);
                let input3 = regex.test(valor3);
                let input4 = regex.test(valor4);

                if (valor0 == "" || valor1 == "" || valor2 == "" || valor3 == "" || valor4 == ""){
                    mensajeDeErrorEnter();
                }
                else if (input0 == false || input1 == false || input2 == false || input3 == false || input4 == false){
                    mensajeDeErrorValor();
                }
                else if (valor0.length > 1 || valor1.length  > 1 || valor2.length > 1 || valor3.length > 1 || valor4.length > 1 ){
                    mensajeDeErrorUnaLetra();
                }
                else{
                guardarRespuestaPartidaCargada(indice);
                eliminarMensajeDeError();

                let respuestaUsuario = respuestas[indice];
                let respuestaUsuarioString = respuestaUsuario.join("");

                if (respuestaUsuarioString == palabraGanadora){
                    gameOver = true;
                    showBtn();
                    document.getElementById("mensaje-resultado").style.color = "rgb(21, 211, 21)";
                    document.getElementById("mensaje-resultado").innerHTML = "--- GANASTE!! --- ";
                    scorePartidaGanada(indice); // Guardamos los datos de la partida con el score
                    bloqueoFieldsetGanarOPerder();
                }

                if (indice == 0 && respuestaUsuarioString != palabraGanadora){
                    document.getElementById("fila1").disabled=false;
                    document.getElementById("fila0").disabled=true;
                    document.getElementById("f1c0").focus();
                }
                if (indice == 1 && respuestaUsuarioString != palabraGanadora){
                    document.getElementById("fila2").disabled=false;
                    document.getElementById("fila1").disabled=true;
                    document.getElementById("f2c0").focus();
                }
                if (indice == 2 && respuestaUsuarioString != palabraGanadora){
                    document.getElementById("fila3").disabled=false;
                    document.getElementById("fila2").disabled=true;
                    document.getElementById("f3c0").focus();
                }
                if (indice == 3 && respuestaUsuarioString != palabraGanadora){
                    document.getElementById("fila4").disabled=false;
                    document.getElementById("fila3").disabled=true;
                    document.getElementById("f4c0").focus();
                }
                if (indice == 4 && respuestaUsuarioString != palabraGanadora){
                    document.getElementById("fila5").disabled=false;
                    document.getElementById("fila4").disabled=true;
                    document.getElementById("f5c0").focus();
                }
                if (indice == 5  && respuestaUsuarioString != palabraGanadora){
                    gameOver = true;
                    showBtn();
                    document.getElementById("mensaje-resultado").innerHTML = `Game OVER! No quedan mas intentos. La palabra es: "${palabraGanadora}"`;
                    bloqueoFieldsetGanarOPerder();
                    }
                }
            }
        }
    }
}

//Funcion para asignar score, se ejecuta cuando el jugador gana
function scorePartidaGanada(fila){

    let puntajeTimer = document.querySelector("#time").innerHTML; //Traigo la fecha capturada para multiplicar por puntaje
    let puntuacionTimer = puntajeTimer.replace(":", ""); //Elimino simbolo :
    let puntuacionTimerNumber = Number(puntuacionTimer) //Paso string a number

    let puntaje = {};

    puntaje.fecha = new Date().toLocaleString("es-AR", { timeZone:"America/Argentina/Buenos_Aires"});
    puntaje.nombre = document.getElementById("nombre-jugador-input").value;

    //calcular puntaje
    switch (fila) {

        case 0:
            calculoPuntaje0 = 2 * puntuacionTimerNumber
            puntaje.puntaje = Math.round(calculoPuntaje0) //Redondeamos puntaje
            break;

        case 1:
            calculoPuntaje1 = 1.5 * puntuacionTimerNumber
            puntaje.puntaje = Math.round(calculoPuntaje1)
            break;

        case 2:
            calculoPuntaje2 = 1.2 * puntuacionTimerNumber
            puntaje.puntaje = Math.round(calculoPuntaje2)
            break;

        case 3:
            calculoPuntaje3 = 1 * puntuacionTimerNumber
            puntaje.puntaje = Math.round(calculoPuntaje3)
            break;

        case 4:
            calculoPuntaje4 = 0.8 * puntuacionTimerNumber
            puntaje.puntaje = Math.round(calculoPuntaje4)
            break;

        case 5:
            calculoPuntaje5 = 0.5 * puntuacionTimerNumber
            puntaje.puntaje = Math.round(calculoPuntaje5)
            break;

        default:
            break;
    }

    //Traigo del localStorage el array "puntajes", si no esta le asigno "[]"
    let puntajesArray = JSON.parse(localStorage.getItem("puntajes")) || [];
    puntajesArray.push(puntaje);
    //Convierto mi array de puntajes a json
    let puntajeArrayJSON = JSON.stringify(puntajesArray);
    //Guardo mi array de puntajes en formato JSON en el local storage
    localStorage.setItem("puntajes", puntajeArrayJSON)

}


function obtenerPuntajes() { //Funcion para obtener puntajes. Ordena por fecha. la ejecuto en "Ranking"

    //Traigo del localStorage el array "puntajes", si no esta le asigno "[]"
    let puntajesArray = JSON.parse(localStorage.getItem("puntajes")) || [];

    //Muestro la lista de puntajes ordenado por fecha de mas nueva a mas antigua
    let body = "";
    for (var i = 0; i < puntajesArray.length; i++) {
            body += `<tr role="row">
                        <td data-label="NOMBRE">${(puntajesArray[puntajesArray.length-1-i].nombre)}</td>
                        <td data-label="FECHA">${(puntajesArray[puntajesArray.length-1-i].fecha)}</td>
                        <td data-label="PUNTAJE">${(puntajesArray[puntajesArray.length-1-i].puntaje)}</td>
                    </tr>`
        }
    document.getElementById("puntajes").innerHTML = body;
}

function orderscoreboard() { //Funcion para ordenar puntajes

    //Traigo del localStorage el array "puntajes", si no esta le asigno "[]"
    let puntajesArray = JSON.parse(localStorage.getItem('puntajes')) || [];

    //ordeno el array de puntajes por puntaje de mayor a menor
    puntajesArray.sort(function (a, b){
        if (a.puntaje > b.puntaje) {
            return 1;
          }
          if (a.puntaje < b.puntaje) {
            return -1;
          }
          // a must be equal to b
          return 0;
    });

    //Muestro la lista de puntajes ordenado por puntaje del mas alto al mas bajo
    let body = '';
    for (var i = 0; i < puntajesArray.length; i++) {
            body += `<tr role="row">
                        <td data-label="NOMBRE">${(puntajesArray[puntajesArray.length-1-i].nombre)}</td>
                        <td data-label="FECHA">${(puntajesArray[puntajesArray.length-1-i].fecha)}</td>
                        <td data-label="PUNTAJE">${(puntajesArray[puntajesArray.length-1-i].puntaje)}</td>
                    </tr>`
        }
    document.getElementById('puntajes').innerHTML = body;
}

function obtenerSaves() {

    //Traigo del localStorage el array "saves", si no esta le asigno "[]"
    let savesArray = JSON.parse(localStorage.getItem('saves')) || [];

    //Muestro la lista de saves para el nombre ingresado
    let body = "";
    let partida = savesArray.length+1;
    for (var i = savesArray.length-1; i >= 0; i--) { //Itero al revés para indexar correctamente
        partida--;
        body += `<tr class="fila-partidas-guardadas" onclick=loadGame('${i}') role="row">
                    <td class="data-partida-guardadas" data-label="PARTIDA">${partida}</td>
                    <td class="data-partida-guardadas" data-label="NOMBRE">${(savesArray[i].usuario)}</td>
                    <td class="data-partida-guardadas" data-label="FECHA">${(savesArray[i].fecha)}</td>
                </tr>`
    }

    document.getElementById("puntajes").innerHTML = body;
}

var regex = new RegExp ("[A-Z]");

var estadoGanador = false;
var estadoPerdedor = false;

function bloqueoFieldsetGanarOPerder() {
    for (let indice = 0; indice < 6; indice++){
        let fieldset = document.getElementById(`fila${indice}`);
        if (estadoGanador || estadoPerdedor);
        fieldset.disabled=true;
    }
}

function mensajeDeErrorEnter() {
    errorCampoVacio = document.getElementById("mensaje-error");
    errorCampoVacio.innerHTML = "Complete todos los campos de la fila";
    errorCampoVacio.style.visibility = "visible";
}

function mensajeDeErrorValor() {
    errorCampoValor = document.getElementById("mensaje-error");
    errorCampoValor.innerHTML = "Introduzca solo letras mayusculas";
    errorCampoValor.style.visibility = "visible";
}

function mensajeDeErrorUnaLetra() {
    errorCampoValor = document.getElementById("mensaje-error");
    errorCampoValor.innerHTML = "Introduzca solo una letra por campo";
    errorCampoValor.style.visibility = "visible";
}

function eliminarMensajeDeError() {
    errorCampoValor = document.getElementById("mensaje-error");
    errorCampoValor.style.visibility = "hidden";
}

function inicio () {
    for (let indice = 0; indice < 6; indice++){
        let fieldset = document.getElementById(`fila${indice}`);
        fieldset.onkeydown = function (event){
            if(event.key === `Enter`){
                let validarCaracter = document.querySelectorAll(`#fila${indice} input`);
                let valor0 = validarCaracter[0].value;
                let valor1 = validarCaracter[1].value;
                let valor2 = validarCaracter[2].value;
                let valor3 = validarCaracter[3].value;
                let valor4 = validarCaracter[4].value;

                let input0 = regex.test(valor0);
                let input1 = regex.test(valor1);
                let input2 = regex.test(valor2);
                let input3 = regex.test(valor3);
                let input4 = regex.test(valor4);

                if (valor0 == "" || valor1 == "" || valor2 == "" || valor3 == "" || valor4 == ""){
                    mensajeDeErrorEnter();

                }else if (input0 == false || input1 == false || input2 == false || input3 == false || input4 == false){
                    mensajeDeErrorValor();

                }else if (valor0.length > 1 || valor1.length  > 1 || valor2.length > 1 || valor3.length > 1 || valor4.length > 1 ){
                    mensajeDeErrorUnaLetra();
                }

                else {
                    guardarRespuesta(indice);
                    eliminarMensajeDeError();

                    let respuestaUsuario = respuestas[indice];
                    let respuestaUsuarioString = respuestaUsuario.join("");

                    if (respuestaUsuarioString == palabraGanadora){
                        estadoGanador = true;
                        showBtn();
                        document.getElementById("mensaje-resultado").style.color = "rgb(21, 211, 21)";
                        document.getElementById("mensaje-resultado").innerHTML = "--- GANASTE!! --- ";
                        scorePartidaGanada(indice); // Guardamos los datos de la partida con el score
                        bloqueoFieldsetGanarOPerder();
                    }

                    if (indice == 0 && respuestaUsuarioString != palabraGanadora){
                        document.getElementById("fila1").disabled=false;
                        document.getElementById("fila0").disabled=true;
                        document.getElementById("f1c0").focus();
                    }
                    if (indice == 1 && respuestaUsuarioString != palabraGanadora){
                        document.getElementById("fila2").disabled=false;
                        document.getElementById("fila1").disabled=true;
                        document.getElementById("f2c0").focus();
                    }
                    if (indice == 2 && respuestaUsuarioString != palabraGanadora){
                        document.getElementById("fila3").disabled=false;
                        document.getElementById("fila2").disabled=true;
                        document.getElementById("f3c0").focus();
                    }
                    if (indice == 3 && respuestaUsuarioString != palabraGanadora){
                        document.getElementById("fila4").disabled=false;
                        document.getElementById("fila3").disabled=true;
                        document.getElementById("f4c0").focus();
                    }
                    if (indice == 4 && respuestaUsuarioString != palabraGanadora){
                        document.getElementById("fila5").disabled=false;
                        document.getElementById("fila4").disabled=true;
                        document.getElementById("f5c0").focus();
                    }
                    if (indice == 5  && respuestaUsuarioString != palabraGanadora){
                        estadoPerdedor = true;
                        showBtn();
                        document.getElementById("mensaje-resultado").innerHTML = `Game OVER! No quedan mas intentos. La palabra es: "${palabraGanadora}"`;
                        bloqueoFieldsetGanarOPerder();
                    }
                }
            }
        }
    }
}

function guardarRespuesta(indice){
    for (let iCol = 0; iCol < 5; iCol++){
        let input = document.getElementById(`f${indice}c${iCol}`).value;
        respuestas[indice].push(input);
    }
    revisarResultado(respuestas[indice], indice);
}

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

// Funcion para generar palabras randon

const palabrasDisponibles = ["MATES", "PASTO", "TOSER"/*, "PISAR", "MARCO", "DARDO", "FREIR", "TRUCO", "POSTE", "CENAR",
                             "AGUJA", "AUDIO", "CUEVA", "DOMAR", "GRAVE", "FUMAR", "FRITO", "FURIA", "GANAR", "GASTO",
                             "PERRO", "PISTA", "ARROZ", "ARENA", "MIRAR", "SALTO", "CORTE", "MAREO", "MULTA", "MICRO",
                             "RISAS", "NUBES", "NOTAR", "PLOMO", "PULPA", "PESAR", "PARAR", "PORRA", "TECHO", "TITAN",
"BRISA", "ACERO", "BIRRA", "BARRA", "MARZO", "ABRIL", "JUNIO", "JULIO", "ENERO", "ASADO"*/]

function elegirPalabraAlAzar(palabrasDisponibles) {
    return palabrasDisponibles[Math.floor(Math.random() * palabrasDisponibles.length)]
}

var palabraGanadora = elegirPalabraAlAzar(palabrasDisponibles);

var arrayPalabraGanadora = palabraGanadora.split("");

// Nueva partida, esconder botones
function hideBtn() {
    document.getElementById("nueva-partida").style.display="none";
    document.getElementById("cargar-partida").style.display="none";
    document.getElementById("guardar-partida").style.display="inline-block";
    document.getElementById("timer").style.display="block";
    document.getElementById("time").style.display="inline";
    }

function showBtn() {
    document.getElementById("volver-a-jugar-partida").style.display="inline-block";
    document.getElementById("guardar-partida").style.display="none";
    document.getElementById("mensaje-resultado").style.display="inline-block";
    document.getElementById("time").style.display="none";
    document.getElementById("timer").style.display="none";
}


// salto de input

function tabular(e) {
    let obj = e.target
    let frm = obj.form;
    let largo = obj.value.length;
    let tam = obj.maxLength;
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
    console.log(palabraGanadora)

    let inputsForm = document.getElementById("grilla").querySelectorAll("input");

    inputsForm.forEach(function (x){
        x.addEventListener("keyup", tabular);
    })

    //Funcion para ingresar nombre

    const nuevaPartida = document.getElementById("nueva-partida");
    const volverAJugar = document.getElementById("volver-a-jugar-partida");
    const gurdarPartida = document.getElementById("guardar-partida");
    const rankingPartida = document.getElementById("ranking-partida");
    const cargarPartida = document.getElementById("cargar-partida");

    const form = document.getElementById("formulario-usuario");
    const name = document.getElementById("nombre-jugador-input");

    const ordenFecha = document.getElementById("orden-por-fecha");
    const ordenPuntaje = document.getElementById("orden-por-puntaje");
    const numeroPartida = document.getElementById("numero-partida");

    form.addEventListener("submit", function(e){
        e.preventDefault();

        var regexName = new RegExp ("^[A-Za-z]+$");
        let nameValue = name.value;
        let regexValue = regexName.test(nameValue);

        if (name.value.length < 3 || regexValue == false || name.value == "") {
            errorNombre.innerHTML = "Ingrese un nombre mayor a 2 digitos. Solo letras sin espacios."
            return false; //se utiliza para abortar la funcion
        } else {
            document.getElementById("nombre-jugador").style.display="none";
            gameOver = false;
            inicio();
            timer();
            hideBtn();
            document.getElementById("fila0").disabled=false;
            document.getElementById("f0c0").focus();
            mensajeDeErrorValor();
        }
    })

    nuevaPartida.addEventListener("click", function(){
        document.getElementById("nombre-jugador").style.display="flex";
        name.focus();
    })

    volverAJugar.addEventListener("click", function(){
        gameOver = false;
        location.reload();
    })

    gurdarPartida.addEventListener("click", function(){
        saveProgress();
    })

    rankingPartida.addEventListener("click", function(){
        ordenPuntaje.style.display="table-cell"
        numeroPartida.style.display="none"
        obtenerPuntajes();
        mostrarModal();

        ordenFecha.addEventListener("click", function(){
            obtenerPuntajes();
        })

        ordenPuntaje.addEventListener("click", function(){
            ordenalTablaPuntaje();
        })
    })

    cargarPartida.addEventListener("click", function(){
        document.getElementById("nombre-jugador").style.display="none";
        ordenPuntaje.style.display="none"
        numeroPartida.style.display="table-cell"
        obtenerSaves();
        mostrarModal();

        ordenFecha.addEventListener("click", function(){
            obtenerSaves();
        })
    })

    function mostrarModal() {
        // Ejecuto modal --------
        let modal = document.getElementById("modalPartidas");
        let span = document.getElementById("close");

        // Lo hago visible
        modal.style.display = "block";

        // Si clickea el "botón" de aceptar escondo el modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        // Si clickea fuera del modal, lo escondo
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
}