(function () {

    $.fn.catalogSlider = function (args) {

        var $slider = this;

        var activeCatalogSection = null;
        var totalSlides = 0; 
        var activeSlide = 0;
        var $container = null;
        var $slides = null;
        var $nav = null;

        var navLinks = null;
        var navPrev = null;
        var navNext = null;

        var catalogIdInit = function () {

            var catalogId = activeMenu.data('catid');

            activeSlide = 0;
            totalSlides = 0;
            $container = $slider.find(".slideset__content .slides");

            $slides = $slider.find('.slideset__content .slide[data-catid="' + catalogId + '"]');
            $nav = (typeof args.navElement != 'undefined' && args.navElement.length > 0) ? $(args.navElement) : $slider.find(".catalog-bar .slideset__nav ul");

            $slides.removeClass('d-none');
            $slider.find('.slideset__content .slide[data-catid!="' + catalogId + '"]').addClass('d-none');

            totalSlides = $slides.length;

            recalcSize();
        };

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

        var refreshNav = function() {
            $nav.html('');
            $nav.append('<li><a class="prev" href="#" title="Назад"></a></li>');
            for (var i = 0; i < $slides.length; i++) {
                $nav.append('<li><a class="page" href="#" data-slide="' + i + '" title="Слайд ' + i + '"></a></li>');
            }
            $nav.append('<li><a class="next" href="#" title="Далее"></a></li>');

            bindActions();
        };

        var bindActions = function() {
            navLinks = $nav.find('a.page');
            navPrev = $nav.find('a.prev');
            navNext = $nav.find('a.next');

            $(navLinks[activeSlide]).addClass('active');
            $container.css('left', 0);

            navLinks.off('click').on('click', function () {
                activeSlide = $(this).data('slide');
                goToSlide(activeSlide);
                return false;
            });

            navPrev.off('click').on('click', function () {

                if (activeSlide == 0) {
                    // Переключаем каталог
                    activeSlide = 'TODO';
                    goToSlide(activeSlide);
                } else {
                    activeSlide = activeSlide - 1;
                    goToSlide(activeSlide);
                }

                return false;
            });


            navNext.off('click').on('click', function () {

                if (activeSlide == totalSlides - 1) {
                    // Переключаем каталог
                    activeSlide = 'TODO';
                    goToSlide(activeSlide);
                } else {
                    activeSlide = activeSlide + 1;
                    goToSlide(activeSlide);
                }

                return false;
            });

            $(window).off('resize').on('resize', function () {
                recalcSize();
                goToSlide(activeSlide);
            });
        };

        var switchCatalogSection = function() {
            activeCatalogSection
        };


        if ($slider.length > 0) {

            var activeMenu = $('.catalog-bar .catalog-bar__navbar__menu .active');

            if (activeMenu.length == 0) {
                var links = $('.catalog-bar .catalog-bar__navbar__menu a');
                activeMenu = (links.length > 0) ? $(links[0]) : null;
            }

            if (!activeMenu) {
                console.error('Error! Object Not Found.');
                return;
            }    

            activeCatalogSection = $('.catalog-bar .catalog-bar__navbar__menu .active').index( activeMenu );
            console.log('activeCatalogSection', activeCatalogSection);

            catalogIdInit();        


            if (totalSlides > 0) {
                refreshNav();
            }

        }

        console.log($slider);


    };


    $(window).load(function () {

        $('.catalog-bar .slideset').catalogSlider({
            navElement: $(".catalog-bar .slideset__nav ul")
        });

    });

})();