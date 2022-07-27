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

function hideBtn() {
    document.getElementById("nueva-partida").style.visibility="hidden";
    document.getElementById("timer").style.visibility="visible";
    document.getElementById("grilla").style.visibility="visible";
    }

    function showBtn() {
        document.getElementById("volver-a-jugar-partida").style.display="inline-block";
        document.getElementById("guardar-partida").style.display="none";
        document.getElementById("mensaje-resultado").style.display="inline-block";
        document.getElementById("time").style.display="none";
        document.getElementById("timer").style.display="none";
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
                // Testeo de timer 
                // alert("Game Over; intentalo nuevamente");
                document.getElementById("mensaje-resultado").innerHTML = `Game OVER! Tiempo finalizado. La palabra es: ${palabraGanadora}`;
                //window.location.reload(true);
            }
    }, 1000);
}

nuevaPartida.addEventListener("click", function(){
    document.getElementById("nombre-jugador").style.display="flex";
    document.getElementById("nombre-jugador-input").focus();
})

volverAJugar.addEventListener("click", function(){
    estadoGanador = false;
    estadoPerdedor = false;
    location.reload();
})


gurdarPartida.addEventListener("click", function(){
    saveProgress();
})

rankingPartida.addEventListener("click", function(){
    obtenerPuntajes();
    mostrarModal();
})

    // Nueva partida, esconder botones
    function hideBtn() {
        document.getElementById("nueva-partida").style.display="none";
        document.getElementById("cargar-partida").style.display="none";
        document.getElementById("guardar-partida").style.display="inline-block";
        document.getElementById("timer").style.display="block";
        document.getElementById("time").style.display="inline";
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
                    scorePartidaGanada(indice); // Guardamos los datos de la partida con el score
                    document.getElementById("reset").style.visibility="visibility";
                    document.getElementById("mensaje-resultado").style.color = "rgb(21, 211, 21)";
                    document.getElementById("mensaje-resultado").innerHTML = "--- GANASTE!! --- ";
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
// Guardar Progreso de Partida
function GuardarProgreso(){

    //Declaro un array "save" y le guardo los datos necesarios para poder continuar jugando en otro momento
    let save = {};

    save.fecha = new Date().toLocaleString('es-AR', {timeZone:'America/Argentina/Buenos_Aires'});
    save.tiempo = document.querySelector('#time').innerHTML;
    save.respuestas = respuestas;
    save.usuario = document.getElementById("nombre-jugador-input").value;
    save.palabraGanadora = palabraGanadora;

    //Traigo del localStorage el array "saves", si no esta le asigno "[]"
    let savesArray = JSON.parse(localStorage.getItem('saves')) || [];
    savesArray.push(save);
    //Convierto mi array de saves a json
    let savesArrayJSON = JSON.stringify(savesArray);
    //Guardo mi array de saves en formato JSON en el local storage
    localStorage.setItem("saves", savesArrayJSON);
    window.location.href = "/index.html";
}

    function scorePartidaGanada(fila){
        let puntajeTimer = document.querySelector('#time').innerHTML; //Traigo la fecha capturada para multiplicar por puntaje
        let puntuacionTimer = puntajeTimer.replace(":", ""); //Elimino simbolo :
        let puntuacionTimerNumber = Number(puntuacionTimer) //Paso string a number

        let score = {};
    
        score.fecha = new Date().toLocaleString('en-GB', { timeZone:'America/Argentina/Buenos_Aires'});
        score.nombre = document.getElementById("nombre-jugador-input").value;
    
        //calcular puntaje
        switch (fila) {
    
            case 0:
                calculoPuntaje0 = 2 * puntuacionTimerNumber
                score.puntaje = Math.round(calculoPuntaje0) //Redondeamos puntaje
                break;
    
            case 1:
                calculoPuntaje1 = 1.5 * puntuacionTimerNumber
                score.puntaje = Math.round(calculoPuntaje1)
                break;
    
            case 2:
                calculoPuntaje2 = 1.2 * puntuacionTimerNumber
                score.puntaje = Math.round(calculoPuntaje2)
                break;
    
            case 3:
                calculoPuntaje3 = 1 * puntuacionTimerNumber
                score.puntaje = Math.round(calculoPuntaje3)
                break;
    
            case 4:
                calculoPuntaje4 = 0.8 * puntuacionTimerNumber
                score.puntaje = Math.round(calculoPuntaje4)
                break;
    
            case 5:
                calculoPuntaje5 = 0.5 * puntuacionTimerNumber
                score.puntaje = Math.round(calculoPuntaje5)
                break;
    
            default:
                break;
        }
    
        //Traigo del localStorage el array "puntajes", si no esta le asigno "[]"
        let puntajesArray = JSON.parse(localStorage.getItem('puntajes')) || [];
        puntajesArray.push(puntaje);
        //Convierto mi array de puntajes a json
        let puntajeArrayJSON = JSON.stringify(puntajesArray);
        //Guardo mi array de puntajes en formato JSON en el local storage
        localStorage.setItem("puntajes", puntajeArrayJSON)
    
    }

    function obtenerPuntajes() {

        //Traigo del localStorage el array "puntajes", si no esta le asigno "[]"
        let puntajesArray = JSON.parse(localStorage.getItem('puntajes')) || [];
    
        //Muestro la lista de puntajes ordenado por fecha de mas nueva a mas antigua
        let body = '';
        for (var i = 0; i < puntajesArray.length; i++) {
                body += `<tr role="row">
                            <td data-label="NOMBRE">${(puntajesArray[puntajesArray.length-1-i].nombre)}</td>
                            <td data-label="FECHA">${(puntajesArray[puntajesArray.length-1-i].fecha)}</td>
                            <td data-label="PUNTAJE">${(puntajesArray[puntajesArray.length-1-i].score)}</td>
                        </tr>`
            }
        document.getElementById('puntajes').innerHTML = body;
    }
        
    function mostrarModal() {
        // Ejecuto modal -----------------------------------------------------------
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

    window.onload = function(){

        let inputsForm = document.getElementById("form-wordle").querySelectorAll("input");
    
        inputsForm.forEach(function (x){
            x.addEventListener("keyup", tabular);
        })
    
        //Funcion para ingresar nombre
    
        const nuevaPartida = document.getElementById("nueva-partida");
        const volverAJugar = document.getElementById("volver-a-jugar-partida");
        const gurdarPartida = document.getElementById("guardar-partida");
        const rankingPartida = document.getElementById("ranking-partida");
    
        const form = document.getElementById("formulario-usuario");
        const name = document.getElementById("nombre-jugador-input");
    
        const ordenFecha = document.getElementById("orden-por-fecha");
        const ordenPuntaje = document.getElementById("orden-por-puntaje");
    
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
                estadoGanador = false;
                inicio();
                pintarTablero();
                timer();
                hideBtn();
                document.getElementById("fila0").disabled=false;
                document.getElementById("f0c0").focus();
                mensajeDeErrorValor();
            }
        })
    
        nuevaPartida.addEventListener("click", function(){
            document.getElementById("nombre-jugador").style.display="flex";
            document.getElementById("nombre-jugador-input").focus();
        })
    
        volverAJugar.addEventListener("click", function(){
            estadoGanador = false;
            estadoPerdedor = false;
            location.reload();
        })
    
        gurdarPartida.addEventListener("click", function(){
            saveProgress();
        })
    
        rankingPartida.addEventListener("click", function(){
            obtenerPuntajes();
            mostrarModal();
        })
    
        ordenFecha.addEventListener("click", function(){
            obtenerPuntajes()
        })
    
        ordenPuntaje.addEventListener("click", function(){
            ordenalTablaPuntaje()
        })
    
        // Nueva partida, esconder botones
        function hideBtn() {
            document.getElementById("nueva-partida").style.display="none";
            document.getElementById("cargar-partida").style.display="none";
            document.getElementById("guardar-partida").style.display="inline-block";
            document.getElementById("timer").style.display="block";
            document.getElementById("time").style.display="inline";
            }
    
        function timer() {
            var fiveMinutes = 60 * 5,
            display = document.querySelector("#time");
            startTimer(fiveMinutes, display);
        }
    
        function startTimer(duration, display) {
            var timer = duration, minutes, seconds;
            var reloj = setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);
    
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
    
                display.textContent = minutes + ":" + seconds;
    
                if (estadoGanador || estadoPerdedor){
                    clearInterval(reloj);
                }
    
                if (timer < 60 * 3){
                    document.getElementById("time").style.color="rgb(226, 226, 85)";
                }
    
                if (timer < 60){
                    document.getElementById("time").style.color="rgb(226, 38, 38)";
                }
    
                if (--timer < 0) {
                    estadoPerdedor = true;
                    timer = duration;
                    showBtn();
                    document.getElementById("mensaje-resultado").innerHTML = `Game OVER! Tiempo finalizado. La palabra es: ${palabraGanadora}`;
                    bloqueoFieldsetGanarOPerder();
                }
            }, 1000);
        }
    
    
        function mostrarModal() {
            // Ejecuto modal -----------------------------------------------------------
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