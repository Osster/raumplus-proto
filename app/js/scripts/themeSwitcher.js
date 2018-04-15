(function () {
    $(document).ready(function () {
        var dayBtn = $('.btn-rect.sun');
        var nightBtn = $('.btn-rect.moon');

        dayBtn.off('click').on('click', function () {
            $('body').removeClass('tm-night');
            nightBtn.removeClass('active');
            dayBtn.addClass('active');
            return false;
        });
        nightBtn.off('click').on('click', function () {
            $('body').addClass('tm-night');
            nightBtn.addClass('active');
            dayBtn.removeClass('active');
            return false;
        });
    })
})();