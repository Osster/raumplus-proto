(function () {

    $.fn.catalogSlider = function (args) {

        var $slider = this;

        var $activeMenu = null;
        var activeCatalogSectionKey = null;
        var catalogSections = [];

        var totalSlides = 0; 
        var activeSlideKey = 0;
        var $container = null;
        var $slides = null;
        var $nav = null;

        var $navLinks = null;
        var $navPrev = null;
        var $navNext = null;

        var catalogIdInit = function () {

            var catalogId = $activeMenu.data('catid');

            activeSlideKey = 0;
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
                activeSlideKey = _ActiveSlide;
                var slide = $slides[activeSlideKey];
                $container.css('left', -slide.offsetLeft);
                $nav.find('a.page.active').removeClass('active');
                $($navLinks[activeSlideKey]).addClass('active');
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
            $navLinks = $nav.find('a.page');
            $navPrev = $nav.find('a.prev');
            $navNext = $nav.find('a.next');

            $($navLinks[activeSlideKey]).addClass('active');
            $container.css('left', 0);

            $navLinks.off('click').on('click', function () {
                activeSlideKey = $(this).data('slide');
                goToSlide(activeSlideKey);
                return false;
            });

            $navPrev.off('click').on('click', function () {

                if (activeSlideKey == 0) {
                    // Переключаем каталог
                    activeCatalogSectionKey = (activeCatalogSectionKey > 0) ? activeCatalogSectionKey-- : $catalogSections.length-1;
                    var catid = $($catalogSections[activeCatalogSectionKey]).data('catid');
                    switchCatalogSection(catid);

                    //goToSlide(activeSlideKey);
                } else {
                    activeSlideKey = activeSlideKey - 1;
                    goToSlide(activeSlideKey);
                }

                return false;
            });


            $navNext.off('click').on('click', function () {

                if (activeSlideKey == totalSlides - 1) {
                    // Переключаем каталог
                    activeCatalogSectionKey = (activeCatalogSectionKey < $catalogSections.length-1) ? activeCatalogSectionKey++ : 0;
                    var catid = $($catalogSections[activeCatalogSectionKey]).data('catid');
                    switchCatalogSection(catid);

                    //goToSlide(activeSlideKey);
                } else {
                    activeSlideKey = activeSlideKey + 1;
                    goToSlide(activeSlideKey);
                }

                return false;
            });

            $(window).off('resize').on('resize', function () {
                recalcSize();
                goToSlide(activeSlideKey);
            });
        };

        var switchCatalogSection = function(catid, callback) {
            
            
            console.log('catid', catid);
            
        };


        if ($slider.length > 0) {

            $activeMenu = $('.catalog-bar .catalog-bar__navbar__menu .active');

            if ($activeMenu.length == 0) {
                var links = $('.catalog-bar .catalog-bar__navbar__menu a');
                $activeMenu = (links.length > 0) ? $(links[0]) : null;
            }

            if (!$activeMenu) {
                console.error('Error! Object Not Found.');
                return;
            }    

            var $catalogSections = $('.catalog-bar .catalog-bar__navbar__menu > ul > li > a');

            // Object.keys(catalogSections).map(function(k) {
            //     catalogSections[k];
            // });

            activeCatalogSectionKey = $('.catalog-bar .catalog-bar__navbar__menu > ul > li > a').index( $activeMenu );
            //console.log('activeCatalogSectionKey', activeCatalogSectionKey);

            var dataCatId = $(this).data('catid');


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