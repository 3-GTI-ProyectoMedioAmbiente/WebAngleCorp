/**
 * Author: Sergi Sirvent Sempere
 * Fecha: 18/11/2021
 * arriba.js
 * 
 * Este script sirve para que al pulsar el boton de la landing te devuelve arriba de la pagina.
 * También hace que si subes arriba del todo el botón se esconde.
 * 
 * 
 */



$(document).ready(function(){

	$('.botonIrHaciaArribaLanding').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});

	$(window).scroll(function(){
		if( $(this).scrollTop() > 500 ){
			$('.botonIrHaciaArribaLanding').slideDown(300);
		}else {
			$('.botonIrHaciaArribaLanding').slideUp(300);
		}
	});

});