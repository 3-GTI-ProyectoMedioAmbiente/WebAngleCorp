//--------------------------------------------
/**
 * obtenerTodasLasMediciones.js
 * @author Sergi Sirvent Sempere
 * Fecha: 2021/10
 *
 * Metodo de la lógica fake que se
 *
 */
//--------------------------------------------
/**
 * Método de la logicaFake que recibe un callback para comunicarse con el método
 * de la lógica verdadera con su mismo nombre
 *
 * @param cb {Callback} - Callback para comunicarse con la logica de negocio
 */
function obtenerTodasLasMediciones(cb){
    // preparar la llamada remota
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function() {
        // callback para cuando llegue la respuesta
        // de la petición que haremos más abajo

        if( this.readyState == 4 && this.status == 200 ){
            // este es el texto JSON recibido la llamada a obtenerTodasLasMediciones.php
            //console.log( "recibo: " + this.responseText )
            var resultado = this.responseText;//almacenamos los valores procedentes del
                                                //metodo de la logica verdadera

            //console.log("Este es el resultado: -->>"+resultado);

            //devuelvo el resultado al index.html con la info de la bd
            cb( null, resultado )
        }
    }
	console.log("hola mundo")
	//realizar peticion REST obtener todas las mediciones

    xmlhttp.open("GET", "http://localhost:8080/obtenerTodasLasMediciones", true)
	xmlhttp.setRequestHeader('Content-Type', 'application/json');
	xmlhttp.setRequestHeader('Access-Control-Allow-Credentials', 'true');
	
    xmlhttp.send()
}