/**
 * publicarInfoPrivada.js
 * @author Sergi Sirvent Sempere
 * Fecha: 2021/12
 *
 * Método de la logicaFake que se comunica con el metodo que publica la informacion privada en la bbdd privada
 *
 *
 * @param jsonInfo --> objeto json con la info a publicar
 * @param cb --> callback encargado de procesar la resouesta de la logica
 *
 * jsonInfo --> publicarInfoPrivada() --> Z
 */

function publicarInfoPrivada(cb,info){
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

    //realizar peticion REST para
    //console.log("Este es el mail: "+mail)


    xmlhttp.open("POST", "http://localhost:5000/publicarInfoPrivada", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xmlhttp.setRequestHeader('Access-Control-Allow-Credentials', 'true');
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin' ,'true');


    //console.log("entro a la logica fake")
    xmlhttp.send(JSON.stringify(info));
}