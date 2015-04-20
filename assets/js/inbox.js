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

//Send message
$(document).on("click","a.view_mm",function(e)
{
	e.preventDefault();
	
	var formData = new FormData(this);

	$.ajax({
		type:'POST',
		url: $(this).attr('action'),
		data:formData,
		cache:false,
		contentType: false,
		processData: false,
		dataType: 'json',
		statusCode: {
			302: function() {
				window.location.href = '<?php echo site_url();?>error';
			}
		},
		success:function(data){
			
			if(data == "false")
			{
				$("#send_error").html('<div class="alert alert-danger">Unable to send message. Please try again</div>');
			}
			else
			{
				// var prev_message_count = parseInt($('#prev_message_count').val());//count the number of messages displayed
				// prev_message_count = prev_message_count + 1;
				// $('#prev_message_count').val(prev_message_count);
				// $('#instant_message2').val('');
				// $("#view_message").html(data.messages);
				// $("#available_credit").html(data.account_balance);
			}
		},
		error: function(xhr, status, error) {
			console.log("XMLHttpRequest=" + xhr.responseText + "\ntextStatus=" + status + "\nerrorThrown=" + error);
			window.location.href = '<?php echo site_url();?>error';
		}
	});
	return false;
});