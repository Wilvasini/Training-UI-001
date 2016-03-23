var sayHello = function()
{
	var name = document.getElementById("name").value;
	var sayHello = "Hello " + name + "!!! <br> Welcome to Training in GIT.";
	document.getElementById("sayHello").innerHTML = sayHello;
}

$(document).ready(function(){	
	$("#btnFormValidate").click(function(){	
		var errorText = '';	
		var checked = true;
		var radio = true;	
		$('#e_errorText').text(errorText);
		$("#employeeForm").find("input[type='text'], select").each(function(i,elem){			
			errorText = '';
			if($(elem).data("validate"))
			{
				if(!$(elem).val())
				{
					errorText = " " + $(elem).data("label") + " should be filled. <br/>";
				}
				else
				{
					if($(elem).data("regexp"))
					{
						var regexp = new RegExp($(elem).data("regexp"));
						if(!(regexp.test($(elem).val())))
						{
							errorText = "Enter a valid " + $(elem).data("label") + ". <br/>";
						}
					}
				}
				$("#e_errorText").append(errorText);				
			}
		});		
		errorText = "";
		$("#employeeForm").children('div.row').find("input[type='radio']").each(function(i,elem){						
			radio = false;
			errorText = "Select a value for Gender. <br/>";
			if(($(elem).is(":checked")))
			{
				radio = true;
				errorText = "";
				return false;
			}						
		});		
		$("#e_errorText").append(errorText);
		$("#employeeForm").children('div.row').find("input[type='checkbox']").each(function(i,elem){			
			checked = false;
			errorText = "Select a value for Hobby. <br/>";
			if(($(elem).is(":checked")))
			{
				checked = true;
				errorText = "";
				return false;
			}			
		});
		$("#e_errorText").append(errorText);
	});

	$("#clearButton").click(function(){
		$("#employeeForm").trigger("reset");
		$('#e_errorText').text('');
	})
});

function onlyNumbers(e) {  
    var keynum;  
    var keychar;  
    var numcheck;  
  
    if(window.event) // IE  
    {  
        keynum = e.keyCode;  
    }  
    else if(e.which) // Netscape/Firefox/Opera  
    {  
        keynum = e.which;  
    }  
    keychar = String.fromCharCode(keynum);  
    numcheck = /\d/;  
    return numcheck.test(keychar);  
}  