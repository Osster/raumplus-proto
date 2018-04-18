(function () {

    $(document).ready(function() {
        var $slides, $nav, $navLinks, $navPrev, $navNext, activeSlideKey;
        var $slider = $('.offers-bar .offers_slideset .offers_slides').lightSlider({
            autoWidth:true,
            //loop:true,
            slideMargin: 25,
            slideMove:3,
            easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
            speed:600,
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


                // Bind Pager To Slideset
                //var $slider = $('.offers-bar .offers_slideset .offers_slides');
                $slides = $('.offers_slide:not(.clone)');
                $nav = $(".offers-bar .slideset__nav ul");
                activeSlideKey = 0;

                $nav.html('');
                $nav.append('<li><a class="prev" href="#" title="Назад"></a></li>');
                for (var i = 0; i < $slides.length; i++) {
                    $nav.append('<li><a class="page" href="#" data-slide="' + i + '" title="Слайд ' + i + '"></a></li>');
                }
                $nav.append('<li><a class="next" href="#" title="Далее"></a></li>');

                $navLinks = $nav.find('a.page');
                $navPrev = $nav.find('a.prev');
                $navNext = $nav.find('a.next');

                $($navLinks[0]).addClass('active');

                $navPrev.on('click', function() {
                    $slider.goToPrevSlide();
                    if (typeof $navLinks[activeSlideKey-1] != '') {
                        $navLinks.removeClass('active');
                        activeSlideKey -= 1;
                        $navLinks[activeSlideKey].addClass('active');
                    }
                    return false;
                });
                $navNext.on('click', function() {
                    $slider.goToNextSlide();
                    if (typeof $navLinks[activeSlideKey+1] != '') {
                        $navLinks.removeClass('active');
                        activeSlideKey += 1;
                        $navLinks[activeSlideKey].addClass('active');
                    }
                    return false;
                });
                $navLinks.on('click', function() {
                    var slideKey = $(this).attr('data-slide');
                    $slider.goToSlide(slideKey);
                    activeSlideKey = slideKey;
                    //console.log('slideKey', slideKey);
                    return false;
                });

                //console.log('$slides', $slides);
            },
            onAfterSlide: function () {
                var _activeSlideKey = -1;
                var activeSlide = $slides.parent().find('.active');
                if (activeSlide.hasClass('left')) {
                    _activeSlideKey = $slides.length - 1;
                }
                if (activeSlide.hasClass('right')) {
                    _activeSlideKey = 0;
                }
                if (_activeSlideKey < 0) {
                    _activeSlideKey = $slides.index(activeSlide);
                }
                $navLinks.removeClass('active');
                $($navLinks[_activeSlideKey]).addClass('active');
                //  console.log('activeSlideKey', _activeSlideKey);
            }
        });
    });



    //

    //$slides.length;

    //console.log('$nav', $nav);

})();