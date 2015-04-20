var base_url = 'https://www.nairobisingles.com/';

$(document).ready(function(){
      get_all_profiles();
});

function get_all_profiles()
{
	$.ajax({
		type:'POST',
		url: base_url+"mobile/account/get_all_profiles?callback=?",
		cache:false,
		contentType: false,
		processData: false,
		dataType: 'json',
		success:function(data)
		{
			$(".profiles").html(data.result).fadeIn( "slow");
			$("#profile_username").html(data.username).fadeIn( "slow");
		},
		error: function(xhr, status, error) 
		{
			$(".profiles").html('<div class="alert alert-danger center-align">'+error+'</div>').fadeIn( "slow");
		}
	});
	
	return false;
}



