(function () {
    var $slider;
    var onDesctop = function (cb) {
        var ws = $(window).width();
        if (ws >= 1280 && typeof cb === 'function') {
            cb();
        }
    };

    $(window).load(function () {

        $slider = $('.slider-bar .slider__content').lightSlider({
            auto:true,
            loop:true,
            pauseOnHover: true,
            item:1,
            slideMove:1,
            slideMargin: 0,
            easing: 'cubic-bezier(0.5, 0, 0.25, 1)',
            speed:1000,
            pause: 10000,
            onSliderLoad: function() {
                $('.slider-bar .slider__content').removeClass('preload');
                onDesctop(function () {
                    $('.slider-bar .slider__content .slide.active .txt-bar').addClass('show');
                });
            },
            onBeforeSlide: function () {
                onDesctop(function () {
                    $slideBar = $('.slider-bar .slider__content .slide.active .txt-bar');
                    $slideBar.removeClass('show').addClass('hide');
                    setTimeout(function () {
                        $slideBar.removeClass('hide');
                    }, 400);
                });
            },
            onAfterSlide: function () {
                onDesctop(function () {
                    $('.slider-bar .slider__content .slide .txt-bar').removeClass('show');
                    setTimeout(function () {
                        $('.slider-bar .slider__content .slide.active .txt-bar').addClass('show');
                    }, 100);
                });
            }
        });


        // var activeSlide = 0;
        // var totalSlides = 0;
        // var $slider = $(".slider-bar .slider");
        // var $container = $(".slider-bar .slider__content");
        // var $slides = $(".slider-bar .slider__content > .slide");
        // var $nav = $(".slider-bar .slider__nav ul");
        // var scrollBreakpoint = 100;
        //
        // totalSlides = $slides.length;
        //
        // $nav.html('');
        //
        // var goToSlide = function (_ActiveSlide) {
        //     activeSlide = _ActiveSlide;
        //     var slide = $slides[activeSlide];
        //     $container.css('left', -slide.offsetLeft);
        //     $nav.find('a.page.active').removeClass('active');
        //     $(navLinks[activeSlide]).addClass('active');
        //     //console.log('slide.offsetLeft', slide.offsetLeft);
        // };
        //
        // var recalcSize = function () {
        //     var sliderWidth = $slider.width();
        //     var containerWidth = sliderWidth * totalSlides;
        //
        //     $container.css('width', containerWidth);
        //     $slides.css('width', sliderWidth);
        // };
        //
        // recalcSize();
        //
        // $slider.removeClass('preload');
        //
        // if (totalSlides > 0) {
        //     $nav.append('<li><a class="prev" href="#" title="Назад"></a></li>');
        //     for (var i = 0; i < $slides.length; i++) {
        //         $nav.append('<li><a class="page" href="#" data-slide="' + i + '" title="Слайд ' + i + '"></a></li>');
        //     }
        //     $nav.append('<li><a class="next" href="#" title="Далее"></a></li>');
        //
        //     var navLinks = $nav.find('a.page');
        //     var navPrev = $nav.find('a.prev');
        //     var navNext = $nav.find('a.next');
        //
        //     $(navLinks[activeSlide]).addClass('active');
        //     $container.css('left', 0);
        //
        //     navLinks.on('click', function () {
        //         activeSlide = $(this).data('slide');
        //         goToSlide(activeSlide);
        //         return false;
        //     });
        //
        //     navPrev.on('click', function () {
        //         activeSlide = (activeSlide == 0) ? totalSlides - 1 : activeSlide - 1;
        //         goToSlide(activeSlide);
        //         return false;
        //     });
        //
        //     navNext.on('click', function () {
        //         activeSlide = (activeSlide == totalSlides - 1) ? 0 : activeSlide + 1;
        //         goToSlide(activeSlide);
        //         return false;
        //     });
        //
        //     var xDown;
        //     $slides.off('mousedown touchstart')
        //         .off('mouseup touchend')
        //         .on('mousedown touchstart', function (e) {
        //             var t = e.originalEvent.touches[0];
        //             xDown = t.pageX;
        //         })
        //         .on('mouseup touchend', function (e) {
        //             var t = e.originalEvent.changedTouches[0];
        //             var xUp = t.pageX;
        //
        //             if (xDown > xUp && (xDown - xUp) > scrollBreakpoint) {
        //                 console.log('Swiped rtl');
        //                 navNext.trigger('click');
        //             } else if (xDown < xUp && (xUp - xDown) > scrollBreakpoint) {
        //                 console.log('Swiped ltr');
        //                 navPrev.trigger('click');
        //             }
        //         });
        //
        //     $(window).on('resize', function () {
        //         recalcSize();
        //         goToSlide(activeSlide);
        //     });
        // }
    });

    window.addEventListener('resize', function (e) {
        $slider.refresh();
        //console.log('$slider', $slider);
    });
})();