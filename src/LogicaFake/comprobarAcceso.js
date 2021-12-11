/**
 * comprobarAcceso.js
 * @author Sergi Sirvent Sempere
 * Fecha: 2021/12
 *
 * Método de la logicaFake que comprueba si hay una sesión iniciada
 *
 *
 * comprobarAcceso()
 */
function comprobarAcceso(){

        if (sessionStorage.getItem("usuarioActivoMail") == null){
            window.location.href = "login.html";
        }else{
            window.location.href = "usuario.html";
        }

}