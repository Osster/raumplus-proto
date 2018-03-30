(function () {
    $.fn.overlayNav = function () {
        var $nav = this;

        if ($nav.length > 0) {

            console.log('$nav', $nav);

            window.openNav = function () {
                console.log('$nav', $nav);
                $($nav).css('top', '0');
                $($nav).css('opacity', '1');
                return false;
            };

            window.closeNav = function () {
                $($nav).css('top', '-100%');
                $($nav).css('opacity', '0');
                return false;
            };

            closeNav();

            $nav.find('.closebtn').on('click', closeNav);
        }
    };

    $(document).ready(function () {
        $('#mainNav').overlayNav();
        $('header .menu-icon').on('click', function () {
           openNav();
        });
    })
})();