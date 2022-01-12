
function getColor(number){
	var res;
	if(number>=0 && number<=40){
		res="divClusterGreen"
	}else if(number>40 && number<=100){
		res="divClusterOrange"
	}else if(number>100){
		res="divClusterRed"
	}
	return res;
}

var mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
var mapId = 'mapbox/streets-v11';
var urlMap = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
var myAccesToken = 'pk.eyJ1IjoianVhbmM5OSIsImEiOiJja3dxa2d3c2IwbmJtMnZwMzluMXhnd3Z3In0.RWnqCTyP-8OeXv2lhI5h7w';

//Creamos el mapa

function generarMapaAFecha(fecha){
	var generalLayer = L.tileLayer(urlMap, {id: mapId, attribution: mapboxAttribution,  maxZoom: 18,accessToken: myAccesToken}),
	NO2Layer = L.tileLayer(urlMap, {id: mapId, attribution: mapboxAttribution,  maxZoom: 18,accessToken: myAccesToken}),
    SOLayer = L.tileLayer(urlMap, {id: mapId, attribution: mapboxAttribution,  maxZoom: 18,accessToken: myAccesToken}),
	O3Layer = L.tileLayer(urlMap, {id: mapId, attribution: mapboxAttribution,  maxZoom: 18,accessToken: myAccesToken}),
	CO2Layer = L.tileLayer(urlMap, {id: mapId, attribution: mapboxAttribution,  maxZoom: 18,accessToken: myAccesToken});

	var map = L.map('map', {center:[38.99, -0.165], zoom:13.5,layers:[generalLayer, NO2Layer, SOLayer, O3Layer, CO2Layer]});

	//L.control.layers(baseMaps, null).addTo(map);


	var mcgLayerSupportGroup = L.markerClusterGroup.layerSupport({
			iconCreateFunction : function(cluster) {
			var val = 0;
			for (i = 0; i < cluster.getAllChildMarkers().length; i++) {
				val = val+ parseInt(cluster.getAllChildMarkers()[i].options.alt.medicion)
				console.log(cluster.getAllChildMarkers()[i].options.alt.medicion)
			} 
			var avg = val / cluster.getAllChildMarkers().length;
			avg = Math.round(avg * 10) / 10
			
			return new L.divIcon({
				html: "<div class=\""+getColor(avg)+"\"><span>" + avg + "</span></div>",
				className: ' marker-cluster',
				iconSize: new L.point(40, 40)
			})
		}}),
	gasAQI = L.layerGroup(),
	gasNO2 = L.layerGroup(),
    gasSO = L.layerGroup(),
	gasO3 = L.layerGroup(),
	gasCO2 = L.layerGroup()

	mcgLayerSupportGroup.addTo(map);


	obtenerMedicionesGlobalesFecha(function (err,res) {
                    var arrayJSON = JSON.parse(res)//almaceno el resultado en un arrayJSON
                    arrayJSON=arrayJSON.mediciones;
					var medicion,marker,stringMedicion;
					
					// Creates markers
					var redMarker = L.AwesomeMarkers.icon({
						markerColor: 'red'
					});
					
					var orangeMarker = L.AwesomeMarkers.icon({
						markerColor: 'orange'
					});
					
					var greenMarker = L.AwesomeMarkers.icon({
						markerColor: 'green'
					});
  
                    for(var i = 0 ; i<arrayJSON.length;i++){//recorremos la array y llenamos las filas de la tabla
						medicion=arrayJSON[i];
						
						if(medicion.medicion>=0 && medicion.medicion<=40){
							marker=L.marker([medicion.localizacion_lat,medicion.localizacion_lon], {icon:greenMarker, alt:medicion});
						}else if(medicion.medicion>40 && medicion.medicion<=100){
							marker=L.marker([medicion.localizacion_lat,medicion.localizacion_lon], {icon:orangeMarker,alt:medicion,title:medicion.medicion});
						}else if(medicion.medicion>100){
							marker=L.marker([medicion.localizacion_lat,medicion.localizacion_lon], {icon:redMarker, alt:medicion});
						}
						
						marker.bindPopup(generalLayer);
						marker.addTo(gasAQI);
						if(medicion.id_tipoMedicion==3){
							//NO2
							marker.addTo(gasNO2);
							stringMedicion = "NO2: ";
						}else if(medicion.id_tipoMedicion==4){
							//SO
							marker.addTo(gasSO);
							stringMedicion = "SO: ";
						}else if(medicion.id_tipoMedicion==5){
							//O3
							marker.addTo(gasO3);
							stringMedicion = "O3: ";
						}else if(medicion.id_tipoMedicion==6){
							//CO2
							marker.addTo(gasCO2);
							stringMedicion = "CO2: ";
						}
						marker.bindPopup("<b>Medición</b><br>"+stringMedicion+medicion.medicion+" µg/m3");
                    }
	},fecha)
	mcgLayerSupportGroup.checkIn([gasAQI,gasNO2, gasSO, gasO3, gasCO2]);
	var baseMaps = {
		"AQI":gasAQI,
		"NO2": gasNO2,
		"SO": gasSO,
		"O3": gasO3,
		"CO2":gasCO2	
	};

	L.control.layers(baseMaps, null).addTo(map);
	map.addLayer(gasAQI);
}


function handler(e){
	//borramos el mapa para poder volver a inicializarlo
	document.getElementById('contenedorMapa').innerHTML = "<div id='map''></div>";

	var fechaSelctor=e.target.value;
	generarMapaAFecha(fechaSelctor)
}