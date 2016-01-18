/**
 Jquery code for responsive UI and 
 server communication via AJAX
 */

$(function(){ //wait for the page to be fully loaded
	updateCurrentStatus();
	
	$(".btn").click(function(){ //if element of class "btn" is clicked
		var btn_status = {id:"", val:""}; //data to be sent to the server
		console.log("classe: " + $(this).attr("class").indexOf("success"));
		
		if($(this).attr("class").indexOf("success") != -1){ //check whether button is pressed or not
			console.log("off!");
			$(this).attr("class","btn btn-block btn-danger").val($(this).attr("id") + ":OFF"); //changes label and color
			btn_status.id = $(this).attr("id"); //get which button was clicked
			btn_status.val = "off"; //tell the server the button is clicked
		}
		
		else{ //if button was unclicked
			$(this).attr("class","btn btn-block btn-success").val($(this).attr("id") + ":ON"); //changes label and color
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

function updateCurrentStatus(){
	/* Function that gets the current GPIO status and updates the page accordingly*/
	$.post("/gpio", {id:'getGPIO'}, function (data, status){ //send data to the server via HTTP POST
		if(status == "success"){ //if server responds ok
			console.log(data);//print server response to the console
			for (currGpio in data){ //iterate through all GPIO
				console.log(currGpio + " ---> " + data[currGpio]);
				if(data[currGpio]){ //if state is ON (or HIGH)
					$("#" + currGpio).attr("class","btn btn-block btn-success").val(currGpio + ":ON"); //changes label and color
				}
				else{ //if state is OFF (or LOW)
					$("#" + currGpio).attr("class","btn btn-block btn-danger").val(currGpio + ":OFF"); //changes label and color
				}
			}
		}
	},"json"); //server response shuld be in JSON encoded format
}