var base_url = 'https://www.nairobisingles.com/';

/* Function to check for network connectivity */

function is_connected()
{
	navigator.network.isReachable(base_url, function(status) {
		var connectivity = (status.internetConnectionStatus || status.code || status);
		if (connectivity === NetworkStatus.NOT_REACHABLE) {
			return false;
			//alert("No internet connection - we won't be able to show you any maps");
		} else {
			return true;
			//alert("We can reach Google - get ready for some awesome maps!");
		}
	});
}

//Login client
$(document).on("submit","form#signin-client",function(e)
{
	e.preventDefault();
	
	//check if there is a network connection
	var connection = is_connected();
	
	if(connection == true)
	{
		var form_data = new FormData(this);
		var form_action = $(this).attr('action');
	
		$.ajax({
			type:'POST',
			url: base_url+form_action,
			data:form_data,
			cache:false,
			contentType: false,
			processData: false,
			dataType: 'json',
			success:function(data)
			{	
				if(data.message == "success")
				{
					$("#main_body").html(data.result.client_username);
				}
				else
				{
					$("#main_body").html(data.result);
				}
			},
			error: function(xhr, status, error) 
			{
				$("#main_body").html(error);
			}
		});
	}
	
	else
	{
		alert("No internet connection - please check your internet connection then try again");
	}
	return false;
});

run(function () {
    // immediately invoked on first run
    var init = (function () {
        navigator.network.isReachable(base_url, function(status) {
			var connectivity = (status.internetConnectionStatus || status.code || status);
        	if (connectivity === NetworkStatus.NOT_REACHABLE) {
        		alert("No internet connection - we won't be able to show you any maps");
        	} else {
        		alert("We can reach Google - get ready for some awesome maps!");
        	}
        });
    })();
    
    // a little inline controller
    when('#welcome');
    when('#settings', function() {
		// load settings from store and make sure we persist radio buttons.
		store.get('config', function(saved) {
			if (saved) {
				if (saved.map) {
					x$('input[value=' + saved.map + ']').attr('checked',true);
				}
				if (saved.zoom) {
					x$('input[name=zoom][value="' + saved.zoom + '"]').attr('checked',true);
				}
			}
		});
	});
    when('#map', function () {
        store.get('config', function (saved) {
            // construct a gmap str
            var map  = saved ? saved.map || ui('map') : ui('map')
            ,   zoom = saved ? saved.zoom || ui('zoom') : ui('zoom')
            ,   path = "http://maps.google.com/maps/api/staticmap?center=";
			
            navigator.geolocation.getCurrentPosition(function (position) {
                var location = "" + position.coords.latitude + "," + position.coords.longitude;
                path += location + "&zoom=" + zoom;
                path += "&size=250x250&maptype=" + map + "&markers=color:red|label:P|";
                path += location + "&sensor=false";

                x$('img#static_map').attr('src', path);
            });
        });
    });
    when('#save', function () {
        store.save({
            key:'config',
            map:ui('map'),
            zoom:ui('zoom')
        });
        display('#welcome');
    });
});
