// JavaScript Document

        $(document).ready(function() {

            $(".boton").click(function () {
                $('html,body').animate({
                    scrollTop: $("#destino").offset().top
                }, 500);
            });

        });