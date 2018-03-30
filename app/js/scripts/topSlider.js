
(function () {
    $(window).load(function () {
        var activeSlide = 0;
        var totalSlides = 0;
        var $slider = $(".slider-bar .slider");
        var $container = $(".slider-bar .slider__content");
        var $slides = $(".slider-bar .slider__content > .slide");
        var $nav = $(".slider-bar .slider__nav ul");

        totalSlides = $slides.length;

        $nav.html('');

        var goToSlide = function (_ActiveSlide) {
            activeSlide = _ActiveSlide;
            var slide = $slides[activeSlide];
            $container.css('left', -slide.offsetLeft);
            $nav.find('a.page.active').removeClass('active');
            $(navLinks[activeSlide]).addClass('active');
            //console.log('slide.offsetLeft', slide.offsetLeft);
        };

        var recalcSize = function () {
            var sliderWidth = $slider.width();
            var containerWidth = sliderWidth * totalSlides;

            $container.css('width', containerWidth);
            $slides.css('width', sliderWidth);
        };

        recalcSize();

        if (totalSlides > 0) {
            $nav.append('<li><a class="prev" href="#" title="Назад"></a></li>');
            for (var i=0;i<$slides.length; i++) {
                $nav.append('<li><a class="page" href="#" data-slide="' + i + '" title="Слайд ' + i + '"></a></li>');
            }
            $nav.append('<li><a class="next" href="#" title="Далее"></a></li>');

            var navLinks = $nav.find('a.page');
            var navPrev = $nav.find('a.prev');
            var navNext = $nav.find('a.next');

            $(navLinks[activeSlide]).addClass('active');
            $container.css('left', 0);

            navLinks.on('click', function () {
                activeSlide = $(this).data('slide');
                goToSlide(activeSlide);
                return false;
            });

            navPrev.on('click', function () {
                activeSlide = (activeSlide == 0) ? totalSlides-1 : activeSlide-1;
                goToSlide(activeSlide);
                return false;
            });

            navNext.on('click', function () {
                activeSlide = (activeSlide == totalSlides-1) ? 0 : activeSlide+1;
                goToSlide(activeSlide);
                return false;
            });

            $(window).on('resize', function () {
                recalcSize();
                goToSlide(activeSlide);
            });
        }
    });
})();