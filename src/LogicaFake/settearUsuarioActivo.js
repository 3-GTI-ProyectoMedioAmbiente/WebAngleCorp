/**
 * settearUsuarioActivo.js
 * @author Sergi Sirvent Sempere
 * Fecha: 2021/12
 *
 * Metodo de la lógica de negocio fake que se encarga de guardar los datos en la sesion
 * del usuario logueado
 *
 * Usuario -> settearUsuario()
 *
 * @param usuario {Usuario} - Objeto json que contiene los datos de lel usuario que se quiere settear
 */

function settearUsuarioActivo(usuario){

    sessionStorage.setItem("usuarioActivoMail",usuario["mail"])
    sessionStorage.setItem("usuarioActivoNombre",usuario["nombre"])
    sessionStorage.setItem("usuarioActivoApellidos",usuario["apellidos"])
    sessionStorage.setItem("usuarioActivoIsAutobusero",usuario["isAutobusero"])
    sessionStorage.setItem("usuarioActivoEdad",usuario["edad"])
    sessionStorage.setItem("usuarioActivoMatricula",usuario["matricula"])
    sessionStorage.setItem("usuarioActivoTelefono",usuario["telefono"])
    sessionStorage.setItem("usuarioActivoPassword",usuario["password"])

}