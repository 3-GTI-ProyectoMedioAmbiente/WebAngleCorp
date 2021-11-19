$(document).ready(function(){

	$('.botonIrHaciaArribaLanding').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});

	$(window).scroll(function(){
		if( $(this).scrollTop() > 0 ){
			$('.botonIrHaciaArribaLanding').slideDown(300);
		} else {
			$('.botonIrHaciaArribaLanding').slideUp(300);
		}
	});

});