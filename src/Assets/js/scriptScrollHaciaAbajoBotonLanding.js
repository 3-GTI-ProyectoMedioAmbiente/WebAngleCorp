/**
 * Author: Sergi Sirvent Sempere
 * Fecha: 18/11/2021
 * scriptScrollHaciaAbajoBotonLanding.js
 * 
 * Este script sirve para que al pulsar el boton de la landing que apunta hacia abajo
 * que al pulsar te deslice hacia abajo.
 * 
 * 
 */

        $(document).ready(function() {

            $(".aHaciaAbajo").click(function () {
                $('html,body').animate({
                    scrollTop: $("#containerContaminantes").offset().top
                }, 500);
            });

        });