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
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		//var form_data = new FormData(this);
		var form_action = $(this).attr('action');
		//$("#response").fadeOut( "slow").html('');
		
		//get form values
		var email = $("input[name=client_email]").val();
		var password = $("input[name=client_password]").val();
		
		$.ajax({
			type:'POST',
			url: base_url+form_action+"/"+email+"/"+password+"?callback=?",
			cache:false,
			contentType: false,
			processData: false,
			dataType: 'json',
			success:function(data)
			{
				if(data.message == "success")
				{
					//$("#response").html(data.result.client_username).fadeIn( "slow");
					window.location.href = 'pages/profiles.html';
				}
				else
				{
					$("#response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");
				}
			},
			error: function(xhr, status, error) 
			{
				$("#response").html('<div class="alert alert-danger center-align">'+error+'</div>').fadeIn( "slow");
			}
		});
	}
	
	else
	{
		$("#response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
	}
	return false;
});
$(document).ready(function(){
      get_all_profiles();
 });
function get_all_profiles()
{

		
		$.ajax({
			type:'POST',
			url: base_url+"mobile/account/get_profiles?callback=?",
			cache:false,
			contentType: false,
			processData: false,
			dataType: 'json',
			success:function(data)
			{
				$(".profiles").html(data.result).fadeIn( "slow");
			},
			error: function(xhr, status, error) 
			{
				$("#response").html('<div class="alert alert-danger center-align">'+error+'</div>').fadeIn( "slow");
			}
		});
	}
	
	else
	{
		$("#response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
	}
	return false;

}