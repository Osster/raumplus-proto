

(function () {

    function scrollNav() {
        var $navLinks = $("a[href^='#']");

        var margin = 0;

        if ($navLinks.length > 0) {

            console.log('$navLinks.length', $navLinks.length);

            $navLinks.on("click", function(){

                console.log('margin', margin);


                //Animate
                // $('html, body').stop().animate({
                //     scrollTop: $( $(this).attr('href') ).offset().top - margin
                // }, 600);

                return false;
            });

        }

        $('.scrollTop a').scrollTop();
    }

    scrollNav();

})();