(function () {

    $.fn.slideset = function (args) {

        var $slider = this;

        if ($slider.length > 0) {

            var activeSlide = 0;
            var totalSlides = 0;
            var $container = $slider.find(".slideset__content .slides");
            var $slides = $slider.find(".slideset__content .slide");
            var $nav = (typeof args.navElement != 'undefined' && args.navElement.length > 0) ? $(args.navElement) : $slider.find(".slideset__nav ul");

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
                for (var i = 0; i < $slides.length; i++) {
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
                    activeSlide = (activeSlide == 0) ? totalSlides - 1 : activeSlide - 1;
                    goToSlide(activeSlide);
                    return false;
                });

                navNext.on('click', function () {
                    activeSlide = (activeSlide == totalSlides - 1) ? 0 : activeSlide + 1;
                    goToSlide(activeSlide);
                    return false;
                });

                $(window).on('resize', function () {
                    recalcSize();
                    goToSlide(activeSlide);
                });
            }

        }

        //console.log($slider);


    };


    $(window).load(function () {

        $('.offers-bar .slideset').slideset({
            navElement: $(".offers-bar .slideset__nav ul")
        });

    });

})();