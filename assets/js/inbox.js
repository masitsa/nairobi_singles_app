var base_url = 'https://www.nairobisingles.com/';

$(document).ready(function(){
      get_inbox();
});
function get_inbox()
{
	$.ajax({
		type:'POST',
		url: base_url+"mobile/messages/inbox?callback=?",
		cache:false,
		contentType: false,
		processData: false,
		dataType: 'json',
		success:function(data)
		{
			$("#inbox").html(data.result).fadeIn( "slow");
			$("#profile_username").html(data.username).fadeIn( "slow");
		},
		error: function(xhr, status, error) 
		{
			$(".inbox").html('<div class="alert alert-danger center-align">'+error+'</div>').fadeIn( "slow");
		}
	});
	
	return false;
}