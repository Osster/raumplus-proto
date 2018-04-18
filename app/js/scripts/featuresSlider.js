(function () {

    $(document).ready(function() {
        var $slider = $('.about-bar__content__row__features').lightSlider({
            auto: true,
            loop:true,
            slideMargin: 25,
            slideMove:3,
            easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
            speed:600,
            pause: 4000,
            responsive : [
                {
                    breakpoint:800,
                    settings: {
                        item:3,
                        slideMove:1,
                        slideMargin:6,
                    }
                },
                {
                    breakpoint:480,
                    settings: {
                        item:1,
                        slideMove:1
                    }
                }
            ],
            onSliderLoad: function() {
                $('.lightSlider').removeClass('cS-hidden');
            }
        });
    });



    //

    //$slides.length;

    //console.log('$nav', $nav);

})();