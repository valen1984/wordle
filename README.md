Juego a desarrollar
https://wordle.danielfrg.com/

1. Crear una nueva matriz llamada “colores” que tenga la misma dimensión del tablero del juego, en donde en cada posición se deberá guardar un valor numérico de 0 a 3. Luego se debera crear una funcion “pintarTablero” que recorrar dicha matriz y dependiendo del valor guardado en cada posicion de la matriz, pinte de verde, amarillo o gris cada input HTML del tablero, correspondiente a la posicion de la matriz.  

- El valor 0 representa el color blanco.
- El valor 1 representa el color verde.
- El color 2 representa el color amarillo.
El color 3 representa el color gris.

2. Crear una nueva matriz llamada “letras” que tenga la misma dimensión del tablero del juego, en donde en cada posición se debe guardar una letra o un string vacío. Luego se deberá crear una función llamada “inicio” que recorra dicha matriz y le asigne una función al evento onInput de input HTML del tablero, correspondiente a la posición de la matriz. La función debe obtener el valor del input y guardarlo en la matriz “letras” respetando la posición del input en el tablero.

3. Actualizar la función creada en el punto anterior para obtener cada “fila” del tablero representada con el elemento FieldSet para agregar una función en el evento onkeydown que muestra un console.log cuando se presiona la tecla “enter”.

4. Crear una función llamada “validarLetra” que se ejecute cuando se presiona la tecla “enter” cuando una fila del tablero (FieldSet) tenga foco. Esta función debe obtener la letra ingresada en la fila del tablero y chequear si la palabra ingresada es la ganadora o tiene alguna letra en común. Como resultado esta función debe actualizar la matriz de colores creada en el punto 1, y luego debe ejecutar la función “pintarTablero” para mostrar el resultado en pantalla.