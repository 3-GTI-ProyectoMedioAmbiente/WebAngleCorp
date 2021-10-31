from flask import Flask, render_template, request,redirect,url_for
from LogicaFake import LogicaFake

#-----------------------------------------------------------------------------------
# @author: Juan Carlos Hernandez Ramirez
#Fecha: 14/10/2021
#-----------------------------------------------------------------------------------

#Configuracion de la BD
app = Flask(__name__)
ipServer = 'http://localhost:8080'
logicaFake = LogicaFake(ipServer) 

##/
## http://{ip_server}/
## Ruta principal de la pagina web que mostrara todas las mediciones
## @return plantillaWeb: genera el codigo html de la pagina web a partir de las medidicones obtenidas en la BD 
## getAllMeasuresWeb-> HTML
##/
@app.route('/')
def getAllMeasuresWeb():
    dataJson = logicaFake.obtenerTodasLasMediciones()
    data = dataJson['mediciones']
    return render_template('insert.html', mediciones=data)

##/
## http://{ip_server}/getLastMeasuresWeb
## Ruta principal de la pagina web que mostrara las mediciones ultimas mediciones
## @return plantillaWeb: genera el codigo html de la pagina web a partir de las medidicones obtenidas en la BD 
## getAllMeasuresWeb-> HTML
##/
@app.route('/getLastMeasuresWeb',methods=['POST'])
def ultimas_mediciones_web():
    if request.method == 'POST':
        cuantos = request.form['cuantos']
        if cuantos:
            dataJson = logicaFake.obtenerLasUltimasMediciones(cuantos)
            data = dataJson['mediciones']
            return render_template('insert.html', mediciones=data)
        else:
            return redirect(url_for('getAllMeasuresWeb'))

## Inicializacion del servidor
if __name__=='__main__':
        app.run(host='0.0.0.0', debug=True, port=8000)
