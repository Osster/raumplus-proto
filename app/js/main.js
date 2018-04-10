// Импортируем jQuery
//= jquery-2.1.1.js

// Импортируем Popper
//= popper.js

// Импортируем необходимые js-файлы Bootstrap 4
//= ../../node_modules/bootstrap/js/dist/util.js
//= ../../node_modules/bootstrap/js/dist/alert.js
//= ../../node_modules/bootstrap/js/dist/button.js
//= ../../node_modules/bootstrap/js/dist/carousel.js
//= ../../node_modules/bootstrap/js/dist/collapse.js
//= ../../node_modules/bootstrap/js/dist/dropdown.js
//= ../../node_modules/bootstrap/js/dist/modal.js
//= ../../node_modules/bootstrap/js/dist/scrollspy.js
//= ../../node_modules/bootstrap/js/dist/tab.js
//= ../../node_modules/bootstrap/js/dist/tooltip.js
//= ../../node_modules/bootstrap/js/dist/popover.js

// Импортируем необходимые js-файлы lightslider
//= ../../node_modules/lightslider/dist/js/lightslider.js

// Импортируем библиотеки для работы с формами
//= ../../node_modules/jquery-mask-plugin/dist/jquery.mask.js
//= ../../node_modules/jquery-validation/dist/jquery.validate.js

// Форма вслывающего сообщения
//= ../../node_modules/sweetalert2/dist/sweetalert2.js



// Импортируем другие js-файлы
//= init.js


// Импортируем Velocity
//= velocity.min.js
	

jQuery(document).ready(function($) {
    var overlayMenu = $('.menu-overlay-circle'),
		overlayContent = $('.content-overlay-circle'),
		navigation = $('.primary-nav'),
		menuButton = $('.menu-button'),
        homeButton = $('.home-button');

	//inizialize navigation and content layers
	layerInit();
	$(window).on('resize', function(){
		window.requestAnimationFrame(layerInit);
        navigation.removeClass('animated fadeInUp').css('visibility','hidden');
        menuButton.removeClass('close-nav');
        homeButton.css('visibility','hidden');
	});

	menuButton.on('click', function(){
		if(!menuButton.hasClass('close-nav')) {
			menuButton.addClass('close-nav');
			
			overlayMenu.children('span').velocity({
				translateZ: 0,
				scaleX: 1,
				scaleY: 1,
			}, 500, 'easeInCubic', function(){
				navigation.addClass('animated fadeInUp').css('visibility','visible');
                homeButton.css('visibility','visible')
                
			});
		} else {

			menuButton.removeClass('close-nav');
			
			overlayContent.children('span').velocity({
				translateZ: 0,
				scaleX: 1,
				scaleY: 1,
			}, 500, 'easeInCubic', function(){
				navigation.removeClass('animated fadeInUp').css('visibility','hidden');
                homeButton.css('visibility','hidden');
				
				overlayMenu.children('span').velocity({
					translateZ: 0,
					scaleX: 0,
					scaleY: 0,
				}, 0);
				
				overlayContent.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					overlayContent.children('span').velocity({
						translateZ: 0,
						scaleX: 0,
						scaleY: 0,
					}, 0, function(){overlayContent.removeClass('is-hidden')});
				});
				if($('html').hasClass('no-csstransitions')) {
					overlayContent.children('span').velocity({
						translateZ: 0,
						scaleX: 0,
						scaleY: 0,
					}, 0, function(){overlayContent.removeClass('is-hidden')});
				}
			});
		}
	});

	function layerInit(){
		var diameterValue = (Math.sqrt( Math.pow($(window).height(), 2) + Math.pow($(window).width(), 2))*2);
		overlayMenu.children('span').velocity({
			scaleX: 0,
			scaleY: 0,
			translateZ: 0,
		}, 50).velocity({
			height : diameterValue+'px',
			width : diameterValue+'px',
			top : -(diameterValue/2)+'px',
			right : -(diameterValue/2)+'px',
		}, 0);

		overlayContent.children('span').velocity({
			scaleX: 0,
			scaleY: 0,
			translateZ: 0,
		}, 50).velocity({
			height : diameterValue+'px',
			width : diameterValue+'px',
			top : -(diameterValue/2)+'px',
			right : -(diameterValue/2)+'px',
		}, 0);
	};

    $('.primary-nav li').hover(
		function() {
			$(this).find('.li-line').addClass('fadeInLeftBig').removeClass('fadeOutLeftBig');
		},
		function() {
			$(this).find('.li-line').addClass('fadeOutLeftBig').removeClass('fadeInLeftBig');
		}
	)


	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	})

	$(function adjustCollapseView(){
	    var desktopView = $(window).width();
	    if(desktopView >= "768"){
	        $(".collapse-title").attr("data-toggle","");
	       	$('.collapsebar').removeClass('collapse');
	    }else{
	        $(".collapse-title").attr("data-toggle","collapse");
	        $('.collapsebar').addClass('collapse');
	    }
	});

});