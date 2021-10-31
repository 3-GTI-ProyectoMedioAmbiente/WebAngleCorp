import requests
#-----------------------------------------------------------------------------------
# @author: Juan Carlos Hernandez Ramirez
# Fecha: 14/10/2021
#-----------------------------------------------------------------------------------

class LogicaFake:

    ##/
    ## Constructor
    ## @param self: objeto que contiene los propios metods y atributos de la clase
    ## @param app: Clase base que contiene la configuracion del server
    ##/
    def __init__(self, ip):
        self.url = ip

    ##/
    ## Metodo que se comunicara con la logica verdadera para obtener las mediciones
    ## @param self: objeto que contiene los propios metodos y atributos de la clase
    ## @return res: json con formateado que contendra todas las mediciones
    ##/
    def obtenerTodasLasMediciones(self):
        data = requests.get("{}/obtenerTodasLasMediciones".format(self.url))
        if data.status_code==200:
            return data.json()  

    ##/
    ## Metodo que se comunicara con la logica verdadera para obtener las ultimas mediciones mediciones
    ## @param self: objeto que contiene los propios metodos y atributos de la clase
    ## @param cuantos: numero que indicar el numero de ultimas mediciones que inserteremos
    ## @return json: json con formateado que contendra las mediciones segun el parametro recibido
    ##/
    def obtenerLasUltimasMediciones(self,cuantos):
        data = requests.get("{}/obtenerLasUltimasMediciones?cuantos={}".format(self.url,cuantos))
        if data.status_code==200:
            return data.json()  