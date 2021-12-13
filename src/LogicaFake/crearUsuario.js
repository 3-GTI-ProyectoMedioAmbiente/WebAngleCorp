/**
 * crearUsuario.js
 * @author Sergi Sirvent Sempere
 * Fecha: 2021/12
 *
 * Método de la logicaFake que crea un usuario en la base de datos
 *
 * nombre:Texto,apellidos:Texto,mail:Texto,edad:Z,telefono:Texto,
 * contraseña:Texto,isAutobusero:VoF,matricula:Texto -> crearUsuario()
 *
 */
function crearUsuario(cb,nombre,apellidos,mail,edad,telefono,contrasenya,isAutobusero,matricula){
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


    xmlhttp.open("POST", "http://localhost:5000/crearUsuario", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xmlhttp.setRequestHeader('Access-Control-Allow-Credentials', 'true');
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin' ,'true');
    let json = {
        "mail": mail,
        "nombre": nombre,
        "apellidos": apellidos,
        "isAutobusero":isAutobusero,
        "edad": edad,
        "matricula":matricula,
        "telefono":telefono,
        "password": contrasenya
    };

    //console.log("entro a la logica fake")
    xmlhttp.send(JSON.stringify(json));
}