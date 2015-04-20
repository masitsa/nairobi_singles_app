var base_url = 'https://www.nairobisingles.com/';

$(document).ready(function(){
      get_all_likes_me();
      // get_all_i_like();
});
function get_all_likes_me()
{
	$.ajax({
		type:'POST',
		url: base_url+"mobile/account/likes_me?callback=?",
		cache:false,
		contentType: false,
		processData: false,
		dataType: 'json',
		success:function(data)
		{
			$(".likes").html(data.result).fadeIn( "slow");
			$("#profile_username").html(data.username).fadeIn( "slow");
		},
		error: function(xhr, status, error) 
		{
			$(".likes").html('<div class="alert alert-danger center-align">'+error+'</div>').fadeIn( "slow");
		}
	});
	
	return false;
}

function get_all_i_like()
{
	$.ajax({
		type:'POST',
		url: base_url+"mobile/account/i_like?callback=?",
		cache:false,
		contentType: false,
		processData: false,
		dataType: 'json',
		success:function(data)
		{
			$(".likes").html(data.result).fadeIn( "slow");
			$("#profile_username").html(data.username).fadeIn( "slow");
		},
		error: function(xhr, status, error) 
		{
			$(".likes").html('<div class="alert alert-danger center-align">'+error+'</div>').fadeIn( "slow");
		}
	});
	
	return false;
}