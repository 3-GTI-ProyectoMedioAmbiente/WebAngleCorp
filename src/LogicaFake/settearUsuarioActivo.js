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

    let date = new Date(usuario["fechaNacimiento"].toString());
    let dia = date.getDate();
    let mes = date.getMonth();
    if (dia.toString().length < 2){

        dia = ("0"+ dia.toString())
    }
    if (mes.toString().length < 2){

        mes = ("0"+ mes.toString())
    }

    //date = usuario["fechaNacimiento"];
    //date.getDay()
    sessionStorage.setItem("usuarioActivoId",usuario["id"])
    sessionStorage.setItem("usuarioActivoMail",usuario["mail"])
    sessionStorage.setItem("usuarioActivoNombre",usuario["nombre"])
    sessionStorage.setItem("usuarioActivoApellidos",usuario["apellidos"])
    sessionStorage.setItem("usuarioActivoIsAutobusero",usuario["isAutobusero"])
    sessionStorage.setItem("usuarioActivoFechaNacimiento",date.getFullYear().toString() + "-" + mes + "-" + dia)
    sessionStorage.setItem("usuarioActivoMatricula",usuario["matricula"])
    sessionStorage.setItem("usuarioActivoTelefono",usuario["telefono"])
    sessionStorage.setItem("usuarioActivoPassword",usuario["password"])
	sessionStorage.setItem("usuarioActivoIdSensor",usuario["id_sensor"])


    //console.log(sessionStorage.getItem("usuarioActivoFechaNacimiento"))
}