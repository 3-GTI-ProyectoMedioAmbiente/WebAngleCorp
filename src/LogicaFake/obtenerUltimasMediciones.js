//--------------------------------------------
/**
 * obtenerUltimasMediciones.js
 * @author Sergi Sirvent Sempere
 * Fecha: 2021/10
 *
 * Metodo de la lógica de negocio que se encarga de devolver de
 * la base de datos las mediciones que pida el usuario
 *
 */
//--------------------------------------------
/**
 * Método de la logicaFake que recibe un callback para comunicarse con el método
 * de la lógica verdadera con su mismo nombre
 *
 * @param cb {Callback} - Callback para comunicarse con la logica de negocio
 * @param cuantas {Z} - Cantidad de mediciones que pide el usuario
 */
function obtenerUltimasMediciones(cb,cuantas){
    // preparar la llamada remota
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function() {
        // callback para cuando llegue la respuesta
        // de la petición que haremos más abajo

        if( this.readyState == 4 && this.status == 200 ){
            // este es el texto JSON recibido la llamada a obtenerUltimasMediciones.php
            //console.log( "recibo: " + this.responseText )

            var resultado = this.responseText;//almacenamos los valores procedentes del
            //metodo de la logica verdadera

            //console.log("Este es el resultado: -->>"+resultado);


            //devuelvo el resultado al index.html con la info de la bd
            cb( null, resultado )
        }
    }

    // llamamos *remotamente* al fichero obtenerUltimasMediciones.php
    // (la verdadera función de la lógica)
    //ADEMAS -- le pasamos en la url el parametro de cuantas mediciones quiere el usuario, que hemos obtenido de la bd
    xmlhttp.open("GET", "../rest/obtenerUltimasMediciones.php?Cuantas="+cuantas, true)
    xmlhttp.send()
}