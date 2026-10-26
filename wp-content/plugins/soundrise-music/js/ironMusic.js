eventsFilter = function(){
	if ( jQuery('.events-bar').length ) {

		jQuery(document).on('change', '.events-bar #artists_filter', this ,function(e){
			var $bar = jQuery(this).parents('.events-bar')
			var $list = jQuery(this).parents('.events-bar').next('.concerts-list')
			var artist_id = jQuery(this).val();

			if(artist_id == 'all') {
				$list.find('.nothing-found').remove()
				$list.find('li').fadeIn();
			}else{
				$list.find('li').hide();
				$list.find('.nothing-found').remove()
				if ( $list.find('li.artist-'+artist_id).length ) {
                	$list.find('li.artist-'+artist_id).fadeIn();
				}else{

					var noFind = jQuery('<li/>', {
					 'text': ironmusic_vars.i18n.no_events,
					 'class': 'nothing-found'
					})
					$list.find('.nothing-found').remove()
					$list.append(noFind)
				}
			}

		})

	}
}
jQuery(document).ready(function($){
	eventsFilter()
})

function redirect_event_archive(artist_id) {
	$ = jQuery;
	var $params = getParams();
	var redirect_url = (event_url.indexOf('?') != -1 ) ? window.location.origin+window.location.pathname : event_url;
	$params['artist-id'] = artist_id;
	first_param = true;

	$.each($params, function(index, val) {
		if (val != 'all' && index != 'paged') {
			if(first_param) {
				first_param = false;
				redirect_url += '?'+index+'='+val;
			}
			else {
				redirect_url += '&'+index+'='+val;
			}
		}

	});

	window.location.href=redirect_url;

}

function getParams(){
    var oGetVars = {};

    if (location.search.length > 1) {
      for (var aItKey, nKeyId = 0, aCouples = location.search.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
        aItKey = aCouples[nKeyId].split("=");
        oGetVars[decodeURIComponent(aItKey[0])] = aItKey.length > 1 ? decodeURIComponent(aItKey[1]) : "";
      }
    }

    return oGetVars;
}