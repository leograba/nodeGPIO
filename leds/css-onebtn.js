/**
 Jquery code for responsive UI and 
 server communication via AJAX
 */

$(function(){ //wait for the page to be fully loaded
	$(".btn").click(function(){ //if element of class "btn" is clicked
		var btn_status = {id:"", val:""}; //data to be sent to the server
		console.log("classe: " + $(this).attr("class").indexOf("success"));
		
		if($(this).attr("class").indexOf("success") != -1){ //check whether button is pressed or not
			console.log("off!");
			$(this).attr("class","btn btn-block btn-danger").val("LEDx:OFF"); //changes label and color
			btn_status.id = $(this).attr("id"); //get which button was clicked
			btn_status.val = "off"; //tell the server the button is clicked
		}
		
		else{ //if button was unclicked
			$(this).attr("class","btn btn-block btn-success").val("LEDx:ON"); //changes label and color
			btn_status.id = $(this).attr("id"); //get which button was clicked
			btn_status.val = "on"; //tell the server the button is unclicked
			console.log("on!");
		}
		console.log(btn_status);
		
		$.post("/gpio", btn_status, function (data, status){ //send data to the server via HTTP POST
			if(status == "success"){ //if server responds ok
				console.log(data);//print server response to the console
			}
		},"json"); //server response shuld be in JSON encoded format
	});
});