/*global $ jQuery IRON*/
"use strict";
$ = jQuery;
var $wrap = $('.classic-menu');
var $menu = $wrap.find('>ul');
var menu_height = $menu.outerHeight(true);
$wrap.height(menu_height);


// add class ready when classic menu is ready.
$(window).load( function() { $('.classic-menu').addClass('ready'); });
// activate responsiveness to classic menu.

if($('html').hasClass('no-touchevents')) {
	$(window).on('load', responsiveMenu);
	$(window).on('resize', responsiveMenu);
}else{
	$(window).on('resize', responsiveMenu);
	$(window).on('load', responsiveMenu);
}

// function that activate responsiveness
function responsiveMenu() {
		IRON.state.responsive = false;

		var logoSelect = ( IRON.state.logo.page_logo_select !== false ) ? IRON.state.logo.page_logo_select : IRON.state.logo.logo_select;
		var logoSelectResponsive = ( IRON.state.logo.light_responsive )? 'light' : 'dark' ;
		if(typeof IRON.state.logo[logoSelect] !== "undefined"){
			var logo_url = IRON.state.logo[logoSelect].url
			var retina_logo_url = IRON.state.logo[logoSelect].url_retina
		}
		var Resp_logo_url = IRON.state.logo[logoSelectResponsive].url
		var Resp_retina_logo_url = IRON.state.logo[logoSelectResponsive].url_retina


	if( $(window).width() < 1144 ) {
		IRON.state.responsive = true;
		$('.classic-menu').addClass('responsive').removeClass('mini');
		$('.classic-menu').find('.classic-menu-logo').attr('src', Resp_logo_url);
		$('.classic-menu').find('.classic-menu-logo').attr('srcset', Resp_logo_url+' 1x, '+Resp_retina_logo_url+' 2x');


		if( $('.responsive-header').length < 1  ) {
			$('<div class="responsive-header"><a class="sandwich-icon"></a></div>').prependTo('.classic-menu');
			$('.classic-menu.responsive .hotlink').first().addClass('first-hotlink');
			$('.classic-menu.responsive .hotlink').eq(-2).addClass('last-hotlink');
			var hotlinksCount = $('.classic-menu.responsive .hotlink').length;
			var hotlinkWidth = (100 - ((parseInt(hotlinksCount) - 3)*10)) /2;
			if( hotlinksCount > 2 ) $('.classic-menu.responsive .hotlink.first-hotlink, .classic-menu.responsive .hotlink.last-hotlink').attr('style', 'width: ' + hotlinkWidth + '% !important' );
			if( hotlinksCount == 1 ) $('.classic-menu.responsive .hotlink, .classic-menu.responsive .hotlink a').attr('style', 'width: 100% !important; text-align:center !important;' );
            if (jQuery('.languages-selector').children().length == 0){
                $( '.languages-selector' ).remove();
            }

		}
		$('.responsive-header').off().on('click', '.sandwich-icon', function(e) {

			if( $('.classic-menu').is('.visible') ) {
				$('.sandwich-icon').removeClass('opened');
				$('.classic-menu').removeClass('visible');
				$('.classic-menu').scrollTop(0);
				return false;

			} else {
				$('.sandwich-icon').addClass('opened');
				$('.classic-menu').addClass('visible');
			}
		});

		$('.classic-menu ul li a').off().on('click', function(e) {

			// toggle in all case active class
			var anchor = $(this)
			var anchorParents = anchor.parents('li')

			$(this).parents('#menu-main-menu').find('li').each(function(el){
				if ( !_.contains( anchorParents, this ) ) {
					$(this).removeClass('active')
				}
			})
			$(this).closest('li').not('.logo').toggleClass('active');

			if( $(this).attr('href') == '#' ) {
				e.preventDefault();
			}else{
				// window.location.href = $(this).attr('href');
				$('.classic-menu').removeClass('visible');
				$('.classic-menu .sandwich-icon').removeClass('opened');
				$('.classic-menu').scrollTop(0);
			}

		});

	} else {
		$('.classic-menu').removeClass('responsive');
		if($('.classic-menu').hasClass('mini') ){
			if(IRON.state.logo.logo_mini_url != '') {
				$('.classic-menu').find('.classic-menu-logo').attr('src', IRON.state.logo.logo_mini_url);
			}

		}else{
			$('.classic-menu').find('.classic-menu-logo').attr('src', logo_url);
			$('.classic-menu').find('.classic-menu-logo').attr('srcset', logo_url+' 1x, '+retina_logo_url+' 2x');
		}

		$('.classic-menu .hotlink').attr('style', '');
		$('.classic-menu .responsive-header').remove();
	}
}



function fixLogoMargin() {

	if($('.classic-menu > ul > li.logo').hasClass('pull-center') || $('.classic-menu > ul > li.logo').hasClass('pull-top'))
		return false;

	var itemHeight = $('.classic-menu > ul > li').not('.logo').first().outerHeight(true);
	var logoHeight = $('.classic-menu > ul > li.logo a').height();
	var marginTop = (itemHeight / 2) - (logoHeight / 2);
	$('.classic-menu > ul > li.logo a').css('margin', marginTop+'px 0 0');
}




IRON.setupMenu = function() {



	var total_items = $menu.find('>li:not(".hotlink")').length;

	var position = 0;
	if ( IRON.state.logo.logo_align == 'pull-right' ) {
		position = total_items
	}
	if ( IRON.state.logo.logo_align == 'pull-center') {
		position = Math.ceil(total_items / 2);
	}

	var logoSelect = ( IRON.state.logo.page_logo_select !== false ) ? IRON.state.logo.page_logo_select : IRON.state.logo.logo_select;
	var logoSelectScroll = IRON.state.logo.logo_select;
	var logoSelectResponsive = ( IRON.state.logo.light_responsive )? 'light' : 'dark' ;
	if(typeof IRON.state.logo[logoSelect] !== "undefined"){
		var logo_url = IRON.state.logo[logoSelect].url
		var retina_logo_url = IRON.state.logo[logoSelect].url_retina
	}
	var logo_mini_url = IRON.state.logo.logo_mini_url

	var logo_scroll_url = IRON.state.logo[logoSelectScroll].url
	var retina_logo_scroll_url = IRON.state.logo[logoSelectScroll].url_retina

	// Activate Mini menu.
	var lastScrollTop = 0;


		$(document).on('scroll touchmove', function (e) {
		   	var offset = $(this).scrollTop();
		   	var st = $(this).scrollTop();

	       	if( ( $('.classic-menu').hasClass('mini-active') || $('.classic-menu').hasClass('mini-fullwidth-active') ) && !$('.classic-menu').hasClass('responsive')) {
		   		if (offset > 150) {
					if( !$('.classic-menu').hasClass('mini') ){
						$('.classic-menu').css( 'width', '100%' ).addClass('mini');
					}
			    	if( logo_mini_url != '') {
				    	$('.classic-menu').find('.classic-menu-logo').attr('src', logo_mini_url);
				    	$('.classic-menu').find('.classic-menu-logo').attr('srcset', logo_mini_url + ' 1x, ' + logo_mini_url + ' 2x');
			    	}
			    	if( logo_url !== logo_scroll_url ){
			    		$('.classic-menu').find('.classic-menu-logo').attr('src', logo_scroll_url);
				    	$('.classic-menu').find('.classic-menu-logo').attr('srcset', logo_scroll_url + ' 1x, ' + logo_mini_url + ' 2x');
			    	}
			    }
			    if (offset <= 150) {
					if( $('.classic-menu').hasClass('mini') ){
						$('.classic-menu').css( 'width', $('body').width() - 2*parseInt(iron_vars.menu.classic_menu_hmargin) ).removeClass('mini') ;	
					}
					$('.classic-menu').find('.classic-menu-logo').attr('src', logo_url);
					$('.classic-menu').find('.classic-menu-logo').attr('srcset', logo_url+' 1x, '+retina_logo_url+' 2x');
			    }

		    	fixLogoMargin();

			}
			lastScrollTop = st;

			$('.classic-menu').css('height', '');

		});

		setTimeout(function() {
			fixLogoMargin();
		},450);

	if( IRON.state.logo.enable ){


		if(IRON.state.logo.dark.url || IRON.state.logo.light.url) {

			var $logo = $('<li class="logo '+IRON.state.logo.logo_align+'"><a href="'+IRON.state.site_url+'"><img class="classic-menu-logo" src="'+logo_url+'" srcset="'+logo_url+' 1x, '+retina_logo_url+' 2x" alt="'+IRON.state.site_name+'"></a></li>');

		}else{
			var $logo = $('<li class="logo '+IRON.state.logo.logo_align+'"><a href="'+IRON.state.site_url+'">'+IRON.state.site_name+'</a></li>');
		}

		if (!$menu.find('.logo').length) {
			$menu.find('>li').eq(position).before($logo);
		}else{
			$menu.find('.logo img').attr({
				src : logo_url,
				srcset : logo_url+' 1x, '+retina_logo_url+' 2x'
			})
		}

	}

	// Collision: avoid submenu to be out of viewport.
	$menu.find('>li a').on('mouseover', function(e) {
		// check if has submenu
		if( $(this).find(' + ul').length > 0 ) {
			// var zI = 1;
			var $_this = $(this).find(' + ul');
			if( $_this.outerWidth(true) + $_this.offset().left > $(window).width() ) {
				// $_this.css('zIndex', zI++);
				$(this).parent().addClass('collision');
			}
		}

	});

	// hotlinks
	var $hotlinks = $wrap.find('.classic-menu-hot-links');
	if($hotlinks.length > 0) {
		var links = $hotlinks.html();
		$hotlinks.detach();
		$menu.append(links);
	}

	if($('.logo.pull-left')){
		var totalwidth = 0;
		$(".hotlink.pull-right").each(function(){
			totalwidth = totalwidth + $(this).outerWidth(true);
		});
	}

	responsiveMenu();

};

$(window).on('load', IRON.setupMenu );