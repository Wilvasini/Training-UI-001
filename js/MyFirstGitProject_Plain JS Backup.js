var sayHello = function()
{
	var name = document.getElementById("name").value;
	var sayHello = "Hello " + name + "!!! <br> Welcome to Training in GIT.";
	document.getElementById("sayHello").innerHTML = sayHello;
}

function clearData(formID)
{
	document.getElementById(formID).reset();
	document.getElementById('e_errorText').innerHTML = "" ;	
	gender = '';
	hobby = [];
}

var hobby = [];
var hobbyid = 1;
var gender;

function isValid(elem)
{	
	var errorText = '';	
	var checkValue = elem.value;
	var textVal = elem.getAttribute("data-label");
	var inputType = elem.type;
	var regExp;
		
	if(checkValue == "")
	{		
		errorText = " " + textVal + " should be filled. <br/> ";		
	}
	else
	{
		if((elem.getAttribute("data-regexp")))
		{
			regExp = new RegExp(elem.getAttribute("data-regexp"));
			if((!regExp.test(checkValue)))
			{
				errorText = "Enter a valid " + textVal + ". <br/>";				
			}
		}				
	}
	return errorText;
}

function validateEmpForm()
{	
	var errorText = '';
	var elem = document.getElementById('employeeForm').elements;	
	for(var i = 0; i < elem.length; i++)
    {
    	if(elem[i].getAttribute("data-validate") == "true")
    	{
    		if((elem[i].type == "checkbox") && (elem[i].checked))
    		{
    			hobby[hobbyid] = elem[i];
            	hobbyid++;            	
    		} 
    		else if((elem[i].type == "radio") && (elem[i].checked))
    		{
    			gender = elem[i];
    		}  
    		else
    		{
    			errorText += isValid(elem[i]);
    		} 	    		
    		//console.log(elem[i]);
    	}		
	}
	if(!gender)
	{
		errorText += "Select an option for Gender<br/>";
	}
	if(hobby.length == 0)
	{
		errorText += "Select a value for Hobby<br/>";
	}
	document.getElementById('e_errorText').innerHTML = errorText ;	
}

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