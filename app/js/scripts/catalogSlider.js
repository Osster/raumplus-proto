(function () {


    // var $slider = $('.catalog-bar .slideset__content .slides');
    //
    // $slider.sectionSlider({
    //     //auto:true,
    //     loop:true,
    //     item:1,
    //     slideMove:1,
    //     slideMargin: 0,
    //     easing: 'cubic-bezier(0.5, 0, 0.25, 1)',
    //     speed:1000,
    //     pause: 6000,
    //     onSliderLoad: function() {
    //         $('.catalog-bar .slideset__content .slides').removeClass('cS-hidden');
    //     }
    // });

    $.fn.catalogSlider = function (args) {

        var $slider = this;

        var $activeMenu = null;
        var activeCatalogSectionKey = null;
        var $catalogSections = null;
        var $dropDownMenu = null;

        var totalSlides = 0;
        var totalActiveSlides = 0;
        var activeSlideKey = 0;
        var $container = null;
        var $slides = null;
        var $nav = null;

        var $navLinks = null;
        var $navPrev = null;
        var $navNext = null;

        var scrollBreakpoint = 40;

        var catalogIdInit = function () {
            var catalogId = $activeMenu.data('catid');

            activeSlideKey = 0;
            totalSlides = 0;
            totalActiveSlides = 0;
            $container = $slider.find(".slideset__content .slides");

            addBorderSlides();

            $slides = $slider.find('.slideset__content .slide[data-catid="' + catalogId + '"]:not(.clone)');
            $nav = (typeof args.navElement != 'undefined' && args.navElement.length > 0) ? $(args.navElement) : $slider.find(".catalog-bar .slideset__nav ul");

            $slides.removeClass('inactive');
            $slider.find('.slideset__content .slide[data-catid!="' + catalogId + '"]').addClass('inactive');

            totalActiveSlides = $slides.length;
            totalSlides = $slider.find('.slideset__content .slide').length;

            recalcSize();
            dropDownMenuInit();
        };

        var goToSlide = function (_ActiveSlide) {
            activeSlideKey = _ActiveSlide;
            var slide = $slides[activeSlideKey];

            $container.css('transform', 'translate3d(' + (-slide.offsetLeft) + 'px, 0px, 0px)');

            $container.children().removeClass('active');
            $(slide).addClass('active');

            $nav.find('a.page.active').removeClass('active');
            $($navLinks[activeSlideKey]).addClass('active');
            //console.log('slide.offsetLeft', slide.offsetLeft);
        };

        var recalcSize = function () {
            var sliderWidth = $slider.width();
            var containerWidth = sliderWidth * totalSlides;
            $container.css('width', containerWidth);
            $slides.parent().find('.slide').css('width', sliderWidth);
        };

        var refreshNav = function () {
            $nav.html('');
            $nav.append('<li><a class="prev" href="#" title="Назад"></a></li>');
            for (var i = 0; i < $slides.length; i++) {
                $nav.append('<li><a class="page" href="#" data-slide="' + i + '" title="Слайд ' + i + '"></a></li>');
            }
            $nav.append('<li><a class="next" href="#" title="Далее"></a></li>');

            bindActions();
        };

        var bindActions = function () {
            $navLinks = $nav.find('a.page');
            $navPrev = $nav.find('a.prev');
            $navNext = $nav.find('a.next');

            $($navLinks[activeSlideKey]).addClass('active');
            $container.css('transform', 'translate3d(0px, 0px, 0px)');

            $catalogSections.off('click').on('click', function () {
                var catid = $(this).data('catid');
                if (catid) {
                    //console.log('Active catid', catid);
                    //console.log('$activeMenu', $activeMenu);
                    switchCatalogSection(catid, function () {
                        activeSlideKey = 0;
                        goToSlide(activeSlideKey);
                    });
                } else {
                    console.error('Active Section Data Not Set');
                }
                return false;
            });

            $navLinks.off('click').on('click', function () {
                activeSlideKey = $(this).data('slide');
                goToSlide(activeSlideKey);
                return false;
            });

            $navPrev.off('click').on('click', function () {

                var isSlideToEnd = false;
                if (activeSlideKey == 0) {
                    // Если это первая категория имитируем слайд и выполняем переход без анимации
                    if (activeCatalogSectionKey == 0) {
                        isSlideToEnd = true;
                    }
                    // Переключаем каталог
                    activeCatalogSectionKey = (activeCatalogSectionKey > 0) ? activeCatalogSectionKey - 1 : $catalogSections.length - 1;
                    var catid = $($catalogSections[activeCatalogSectionKey]).data('catid');


                    switchCatalogSection(catid, function () {
                        if (isSlideToEnd) {
                            var slide = $slider.find('.slideset__content .slide.clone.left').get(0);
                            $container.css('transform', 'translate3d(' + (-slide.offsetLeft) + 'px, 0px, 0px)');
                            setTimeout(function () {
                                $container.css('transition-duration', '0s');
                                activeSlideKey = totalActiveSlides - 1;
                                goToSlide(activeSlideKey);
                                setTimeout(function () {
                                    $container.css('transition-duration', '0.3s');
                                }, 100);
                            },350);
                        } else {
                            activeSlideKey = totalActiveSlides - 1;
                            goToSlide(activeSlideKey);
                        }
                    });

                    //goToSlide(activeSlideKey);
                } else {
                    activeSlideKey = activeSlideKey - 1;
                    goToSlide(activeSlideKey);
                }

                return false;
            });

            $navNext.off('click').on('click', function () {

                var isSlideToStart = false;
                if (activeSlideKey == (totalActiveSlides - 1)) {

                    // Если это последняя категория имитируем слайд и выполняем переход без анимации
                    if (activeCatalogSectionKey == ($catalogSections.length - 1)) {
                        isSlideToStart = true;
                    }
                    // Переключаем каталог
                    activeCatalogSectionKey = (activeCatalogSectionKey < ($catalogSections.length - 1)) ? activeCatalogSectionKey + 1 : 0;
                    var catid = $($catalogSections[activeCatalogSectionKey]).data('catid');

                    switchCatalogSection(catid, function () {
                        if (isSlideToStart) {
                            var slide = $slider.find('.slideset__content .slide.clone.right').get(0);
                            //console.log('slide', slide);
                            //console.log('slide.offsetLeft', slide.offsetLeft);
                            $container.css('transform', 'translate3d(' + (-slide.offsetLeft) + 'px, 0px, 0px)');
                            setTimeout(function () {
                                $container.css('transition-duration', '0s');
                                activeSlideKey = 0;
                                goToSlide(activeSlideKey);
                                setTimeout(function () {
                                    $container.css('transition-duration', '0.3s');
                                }, 100);
                            },350);
                        } else {
                            activeSlideKey = 0;
                            goToSlide(activeSlideKey);
                        }
                    });

                } else {
                    activeSlideKey = activeSlideKey + 1;
                    goToSlide(activeSlideKey);
                }

                return false;
            });

            var xDown;
            $slides.off('mousedown touchstart')
                .off('mouseup touchend')
                .on('mousedown touchstart', function (e) {
                    var t = e.originalEvent.touches[0];
                    xDown = t.pageX;
                })
                .on('mouseup touchend', function (e) {
                    var t = e.originalEvent.changedTouches[0];
                    var xUp = t.pageX;

                    if (xDown > xUp && (xDown - xUp) > scrollBreakpoint) {
                        //console.log('Swiped rtl');
                        $navNext.trigger('click');
                    } else if (xDown < xUp && (xUp - xDown) > scrollBreakpoint) {
                        //console.log('Swiped ltr');
                        $navPrev.trigger('click');
                    }
                });

            $(window).off('resize').on('resize', function () {
                $container.css('transition-duration', '0s');
                recalcSize();
                setTimeout(function () {
                    goToSlide(activeSlideKey);
                    setTimeout(function () {
                        $container.css('transition-duration', '0.3s');
                    }, 100);
                }, 300);
            });
        };

        var switchCatalogSection = function (catid, callback) {

            var $_activeMenu = $('.catalog-bar .catalog-bar__navbar__menu a[data-catid="' + catid + '"]');

            //console.log('_activeMenu', $_activeMenu);

            if ($_activeMenu.length > 0) {
                $activeMenu.removeClass('active');
                $activeMenu = $_activeMenu;
                $activeMenu.addClass('active');

                activeCatalogSectionKey = $('.catalog-bar .catalog-bar__navbar__menu > ul > li > a').index($activeMenu);

                catalogIdInit();

                if (totalActiveSlides > 0) {
                    refreshNav();
                }

                if (typeof callback == 'function') {
                    callback();
                }
            }

            //console.log('catid', catid);

        };

        var dropDownMenuInit = function () {
            $dropDownMenu = $('.catalog-bar__navbar__dropdown');
            $dropDownMenuSections = $dropDownMenu.find('.dropdown-item a');
            $dropDownMenuLabel = $dropDownMenu.find('a.dropdown-toggle');
            if ($dropDownMenu.length > 0 && $dropDownMenuSections.length > 0) {
                $dropDownMenuSections.parent().removeClass('active');
                var catalogId = $activeMenu.data('catid');
                $dropDownMenuSections.parent().find('a[data-catid="' + catalogId + '"]').parent().addClass('active');
                $dropDownMenuLabel.text($activeMenu.text());
            }
            $dropDownMenuSections
                .off('click')
                .on('click', function () {
                    var catid = $(this).data('catid');
                    switchCatalogSection(catid, function () {
                        activeSlideKey = 0;
                        goToSlide(activeSlideKey);
                    });
            });
        };

        var addBorderSlides = function () {
            var $_slides = $container.children();
            var $clones = $container.find('.clone');
            if ($_slides.length > 1 && $clones.length === 0) {
                console.log('SC', $_slides.length);
                $container.prepend($_slides.eq($_slides.length-1).clone().addClass('clone left'));
                $container.append($_slides.eq(0).clone().addClass('clone right'));
            }
        };

        if ($slider.length > 0) {

            setTimeout(function () {
                $catalogSections = $('.catalog-bar .catalog-bar__navbar__menu > ul > li > a');

                $activeMenu = $catalogSections.parent().find('.active');

                if ($activeMenu.length == 0) {
                    var links = $('.catalog-bar .catalog-bar__navbar__menu a');
                    $activeMenu = (links.length > 0) ? $(links[0]) : null;
                }

                if (!$activeMenu) {
                    console.error('Error! Object Not Found.');
                    return;
                }

                activeCatalogSectionKey = $('.catalog-bar .catalog-bar__navbar__menu > ul > li > a').index($activeMenu);

                var dataCatId = $(this).data('catid');


                catalogIdInit();

                if (totalActiveSlides > 0) {
                    refreshNav();
                }

                // go to first active slide
                if ($slides.length > 0) {
                    goToSlide(0);
                }

                $container.css('transition-duration', '0.3s')
                    .css('transition-timing-function', 'ease');
            }, 100);

        }

    };


    $(window).load(function () {

        $('.catalog-bar .slideset').catalogSlider({
            navElement: $(".catalog-bar .slideset__nav ul")
        });

    });

})();