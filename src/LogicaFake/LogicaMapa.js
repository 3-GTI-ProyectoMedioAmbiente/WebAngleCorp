const MAP_BOX_ATTRIBUTION = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
var MAP_ID = 'mapbox/streets-v11';
var URL_MAP = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
var MY_ACCES_TOKEN = 'pk.eyJ1IjoianVhbmM5OSIsImEiOiJja3dxa2d3c2IwbmJtMnZwMzluMXhnd3Z3In0.RWnqCTyP-8OeXv2lhI5h7w';

const API_KEY_AIRVISUAL= 'fcf387dc-1eea-4cf1-8bf8-88b4d0eb0e56';

//Creamos el mapa

var generalLayer = L.tileLayer(URL_MAP, {id: MAP_ID, attribution: MAP_BOX_ATTRIBUTION,  maxZoom: 18,accessToken: MY_ACCES_TOKEN}),
	NO2Layer = L.tileLayer(URL_MAP, {id: MAP_ID, attribution: MAP_BOX_ATTRIBUTION,  maxZoom: 18,accessToken: MY_ACCES_TOKEN}),
    SOLayer = L.tileLayer(URL_MAP, {id: MAP_ID, attribution: MAP_BOX_ATTRIBUTION,  maxZoom: 18,accessToken: MY_ACCES_TOKEN}),
	O3Layer = L.tileLayer(URL_MAP, {id: MAP_ID, attribution: MAP_BOX_ATTRIBUTION,  maxZoom: 18,accessToken: MY_ACCES_TOKEN}),
	CO2Layer = L.tileLayer(URL_MAP, {id: MAP_ID, attribution: MAP_BOX_ATTRIBUTION,  maxZoom: 18,accessToken: MY_ACCES_TOKEN});

var map = L.map('map', {center:[38.99, -0.165], zoom:13.5,layers:[generalLayer, NO2Layer, SOLayer, O3Layer, CO2Layer]});

//L.control.layers(baseMaps, null).addTo(map);

var	gasAQI = [],
	gasNO2 = [],
    gasSO = [],
	gasO3 = [],
	gasCO2 = []

obtenerMedicionesUltimas24h(function (err,res) {
                    var arrayJSON = JSON.parse(res)//almaceno el resultado en un arrayJSON
                    arrayJSON=arrayJSON.mediciones;
					var medicion,nivel;
				
                    for(var i = 0 ; i<arrayJSON.length;i++){//recorremos la array y llenamos las filas de la tabla
						medicion=arrayJSON[i];
						if(medicion.id_tipoMedicion==3){
							//NO2
							nivel = evaluarMedicion(medicion.medicion, 100,200)
							gasNO2.push([medicion.localizacion_lat, medicion.localizacion_lon, nivel])
						
						}else if(medicion.id_tipoMedicion==4){
							//SO
							nivel = evaluarMedicion(medicion.medicion, 150,300)
							gasSO.push([medicion.localizacion_lat, medicion.localizacion_lon, nivel])
						}else if(medicion.id_tipoMedicion==5){
							//O3
							nivel = evaluarMedicion(medicion.medicion, 120,240)
							gasO3.push([medicion.localizacion_lat, medicion.localizacion_lon, nivel])
						}else if(medicion.id_tipoMedicion==6){
							//CO2
							//Se mide en ppm (partes por millon) - como actualmente en la BD solo tenemos valores entre 0-200 para el CO2
							// se realizarn estimaciones entre estos. En un caso real se evaluarian segun su ppm
							nivel = evaluarMedicion(medicion.medicion, 100,200)
							gasCO2.push([medicion.localizacion_lat, medicion.localizacion_lon, nivel])
						}
						gasAQI.push([medicion.localizacion_lat, medicion.localizacion_lon, nivel])
                    }
})
var maxValue=1,
	radiusValue= 28,
	blurValue=30,
	opacictyValue=10;

	
var heatAQI = L.heatLayer(gasAQI, {radius: radiusValue,max:maxValue, blur:blurValue}),
	heatNO2 = L.heatLayer(gasNO2, {radius: radiusValue,max:maxValue}),
	heatSO = L.heatLayer(gasSO, {radius: radiusValue,max:maxValue}),
	heatO3 = L.heatLayer(gasO3, {radius: radiusValue,max:maxValue}),
	heatCO2 = L.heatLayer(gasCO2, {radius: radiusValue,max:maxValue})	


var baseMaps = {
	"AQI": heatAQI,
    "NO2": heatNO2,
	"SO": heatSO,
	"O3": heatO3,
	"CO2": heatCO2
};

//llamar a las estaciones oficiales:
var estaciones = L.layerGroup([]);


var overlayMaps = {
    "Estaciones Oficiales": estaciones
};

L.control.layers(baseMaps, overlayMaps).addTo(map);
map.addLayer(heatAQI);
heatAQI.redraw();
	
	

//Evalua las mediciones seguns los limites establecidos del gas en cuestion
function evaluarMedicion(medicion,limitePerjudicial,limiteMuyPerjudicial){
	var res;
	if(medicion<=limiteMuyPerjudicial){
		res=2;
	}else if(medicion>limitePerjudicial && medicion<=limiteMuyPerjudicial){
		res=5;
	}else{
		res = 10;
	}
	return res;
}




//Coordenadas estaciones
var latDenia = 38.82342486540077;
var lonDenia = 0.03747960107551845;


var lonValencia =  -0.40401210739832755;
var latValencia = 39.47244768094102;


var latTorrevieja = 38.0256136015186;
var lonTorrevieja = -0.6584938704118041;

var latCastellon = 40.140783973536095;
var lonCastellon = 0.16544066368827592;


obtenerMedicionOficialAirvisual(pintarEstacionOficial,latDenia,lonDenia,"Estación Depuradora de Aguas Residuales (EDAR)");
obtenerMedicionOficialAirvisual(pintarEstacionOficial,latValencia,lonValencia,"Ciutat Administrativa 9 d'octubre");
obtenerMedicionOficialAirvisual(pintarEstacionOficial,latTorrevieja,lonTorrevieja,"Centro de Información del Parque Natural de las Lagunas de la Mata");
obtenerMedicionOficialAirvisual(pintarEstacionOficial,latCastellon,lonCastellon,"Centro de Información del Parque Natural del Prat de Cabanes");


function pintarEstacionOficial( error, jsonMedicionesOficiales,mensajeMarker){
	var json = JSON.parse(jsonMedicionesOficiales);
	console.log(json)
	var aqiValue = json["data"]["current"]["pollution"]["aqius"];
	var lon = json["data"]["location"]["coordinates"][0];
	var lat = json["data"]["location"]["coordinates"][1];
	var marker,textoPerjudicial;
	
	
	// Creamos markers para las estaciones

	if(aqiValue<40){
		marker = L.AwesomeMarkers.icon({
			markerColor: 'green'
		});
		textoPerjudicial='No perjudicial';
	}
	else if(aqiValue<100){
		marker = L.AwesomeMarkers.icon({
			markerColor: 'orange'
		});
		textoPerjudicial= 'Perjudicial';
	}
	else{
		marker = L.AwesomeMarkers.icon({
			markerColor: 'red'
		});
		textoPerjudicial='Muy perjudicial'
	}

	L.marker([lat, lon], {icon:marker}).bindPopup("<b>"+mensajeMarker+  "</b><br>"+ textoPerjudicial +": "  +aqiValue+" pm¹.5").addTo(estaciones);
	//L.marker([38.82194444, 0.03583333]).bindPopup('Medida teorica').addTo(estaciones);

}



// Peticion Servicio AirVisual
function obtenerMedicionOficialAirvisual(cb,latitud,longitud,mensajeMarker){
	
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
												
            //devuelvo el resultado al index.html con la info de la bd
            cb( null, resultado ,mensajeMarker)
        }
    }
	xmlhttp.open("GET", "http://api.airvisual.com/v2/nearest_city?lat="+latitud+"&lon="+longitud+"&key="+API_KEY_AIRVISUAL, true)
	
    //xmlhttp.open("GET", "https://api.airvisual.com/v2/nearest_city?lat=40.136944&lon=0.165555&key=fcf387dc-1eea-4cf1-8bf8-88b4d0eb0e56 	", true)


	
    xmlhttp.send()
}