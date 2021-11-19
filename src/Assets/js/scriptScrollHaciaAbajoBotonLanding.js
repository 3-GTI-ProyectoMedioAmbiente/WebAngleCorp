// JavaScript Document

        $(document).ready(function() {

            $(".aHaciaAbajo").click(function () {
                $('html,body').animate({
                    scrollTop: $("#containerContaminantes").offset().top
                }, 500);
            });

        });