(function () {

    var $slider;
    $(window).load(function() {
        $slider = $('.offers-bar .offers_slideset .offers_slides').lightSlider({
            autoWidth:true,
            loop:true,
            slideMargin: 25,
            slideMove:1,
            easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
            speed:600,
            responsive : [
                {
                    breakpoint:1024,
                    settings: {
                        item:3,
                        slideMove:1,
                        slideMargin:25,
                    }
                },
                {
                    breakpoint:813,
                    settings: {
                        item:2,
                        slideMove:1,
                        slideMargin:25,
                    }
                },
                {
                    breakpoint:480,
                    settings: {
                        item:1,
                        slideMove:1,
                        slideMargin:25,
                    }
                }
            ],
            onSliderLoad: function() {
                $('.lightSlider').removeClass('cS-hidden');

            }
        });
    });

    window.addEventListener('resize', function (e) {
        $slider.refresh();
        //console.log('$slider', $slider);
    });

})();