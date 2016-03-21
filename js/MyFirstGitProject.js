sayHello = function()
{
	var name = document.getElementById("name").value;
	var sayHello = "Hello " + name + "!!! <br> Welcome to Training in GIT.";
	document.getElementById("sayHello").innerHTML = sayHello;
}

var hobby = [];
var hobbyid;
var gender;
var textRegExp = /^[a-zA-Z]*$/;
var emailRegExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
var phRegExp = /^\d{10}$/;	
var dateRegExp = /^(([0-9])|([0-2][0-9])|([3][0-1]))\/((3[01]|[12][0-9]|0[1-9]))\/\d{4}$/;
var errorText = "";

function validateForm()
{	
	hobbyid = 1;
	for(i=0; i<3; i++)
	{		
		if(document.getElementsByName('hobby')[i].checked)
		{
			hobby[hobbyid] = document.getElementsByName('hobby')[i].value;
			hobbyid++;
		}
	}
	for(i=0; i<2; i++)
	{
		if(document.getElementsByName('e_gender')[i].checked)
		{
			gender = document.getElementsByName('e_gender')[i].value;			
		}		
	}			
	errorText = isEmpty(textRegExp,document.getElementById('e_fname').value,document.getElementById('e_fname').previousElementSibling.innerHTML);
	errorText += isEmpty(textRegExp,document.getElementById('e_lname').value,document.getElementById('e_lname').previousElementSibling.innerHTML);
	errorText += isEmpty(emailRegExp,document.getElementById('e_email').value,document.getElementById('e_email').previousElementSibling.innerHTML);
	errorText += isEmpty(phRegExp,document.getElementById('e_ph').value,document.getElementById('e_ph').previousElementSibling.innerHTML);
	errorText += isEmpty("",document.getElementById('e_department').value,document.getElementById('e_department').previousElementSibling.innerHTML);
	errorText += isEmpty(dateRegExp,document.getElementById('e_joiningDate').value,document.getElementById('e_joiningDate').previousElementSibling.innerHTML);
	errorText += isEmpty('',gender,"Gender");
	errorText += isEmpty('',hobby,"Hobby");
	document.getElementById('e_errorText').innerHTML = errorText ;	
}

function clearData(formID)
{
	document.getElementById(formID).reset();
	document.getElementById('e_errorText').innerHTML = "" ;	
	gender = '';
	hobby = [];
}

function isEmpty(regExp, checkValue, textVal)
{	
	var errorText = '';	
	if(textVal=="Hobby"){
  		if(checkValue.length == 0)
  		{
  			errorText = "Select a value for " + textVal + ". <br/>";	
  		} 		
  	}
  	if(checkValue === undefined)
	{
		errorText = "Select a value for " + textVal + ". <br/>";
	}
	if(checkValue == "")
	{		
		errorText = " " + textVal + " should be filled. <br/> ";		
	}
	else
	{
		if((regExp != ''))
		{
			if((!regExp.test(checkValue)))
			{
				errorText = "Enter a valid " + textVal + ". <br/>";				
			}
		}				
	}
	return errorText;
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