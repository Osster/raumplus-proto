(function () {
    var $slider;
    $(document).ready(function () {
        $slider = $('.about-bar__content__row__features').lightSlider({
            loop: true,
            slideMargin: 25,
            slideMove: 1,
            easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
            speed: 600,
            pause: 6000,
            responsive: [
                {
                    breakpoint: 1279,
                    settings: {
                        item: 3,
                        slideMove: 1,
                        slideMargin: 25,
                    }
                },
                {
                    breakpoint: 813,
                    settings: {
                        item: 3,
                        slideMove: 1,
                        slideMargin: 25,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        auto: true,
                        item: 1,
                        slideMove: 1
                    }
                }
            ],
            onSliderLoad: function () {
                $('.lightSlider').removeClass('cS-hidden');
            }
        });

    });

    window.addEventListener('resize', function () {
        setTimeout(function () {
            $slider.refresh();
        }, 100);
    });

    //

    //$slides.length;

    //console.log('$nav', $nav);

})();