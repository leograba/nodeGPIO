/**
 Jquery code for responsive UI and 
 server communication via AJAX
 */

$(function(){ //wait for the page to be fully loaded
	updateCurrentStatus();
	
	$(".btn").click(function(){ //if element of class "btn" is clicked
		var btn_status = {}; //data to be sent to the server
		btn_status.id = $(this).attr("id"); //get which button was clicked
		
		if(this.checked){ //check whether button is pressed or not
			btn_status.val = "on"; //tell the server the button is clicked
			$(this).siblings("label").each(function(){ //iterate through all labels 
				if($(this).attr("for") == btn_status.id){ //find label corresponding to input
					$(this).html("ON").css("color","green"); //change label and color
				}
			});
		}
		
		else{ //if button was unclicked
			btn_status.val = "off"; //tell the server the button is clicked
			$(this).siblings("label").each(function(){ //iterate through all labels 
				if($(this).attr("for") == btn_status.id){ //find label corresponding to input
					$(this).html("OFF").css("color","red"); //change label and color
				}
			});
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
					$("#" + currGpio).siblings("label").each(function(){ //iterate through all labels 
						if($(this).attr("for") == $("#" + currGpio).attr("id")){ //find label corresponding to input
							$(this).html("ON").css("color","green"); //change label and color
						}
					});
				}
				else{ //if state is OFF (or LOW)
					$("#" + currGpio).siblings("label").each(function(){ //iterate through all labels 
						if($(this).attr("for") == $("#" + currGpio).attr("id")){ //find label corresponding to input
							$(this).html("OFF").css("color","red"); //change label and color
						}
					});
				}
			}
		}
	},"json"); //server response shuld be in JSON encoded format
}