/**
 * obetenerMedicionesConPeriodoPorUsuario.js
 * @author Sergi Sirvent Sempere
 * Fecha: 2021/12
 *
 * Método de la logicaFake que se comunica con el metodo que devuelve mediciones por
 * periodo y por usuario de la logica verdadera
 *
 *
 * @param periodo --> Periodo en el que se quiere obtener las mediciones
 * @param id_usuario --> Id del usuario que se quiere obtener las mediciones
 * @param cb --> callback encargado de procesar la resouesta de la logica
 */

function obetenerMedicionesConPeriodoPorUsuario(periodo,id_usuario,cb){
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
            console.log(resultado)
            cb( null, resultado )

        }
    }

    //realizar peticion REST para
    //console.log("Este es el mail: "+mail)


    xmlhttp.open("GET", "http://localhost:5000/obtenerMedicionesConPeriodoPorUsuario?periodo="+periodo+"&idUsuario="+id_usuario, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    //xmlhttp.setRequestHeader('Access-Control-Allow-Credentials', 'true');

    xmlhttp.send();
}