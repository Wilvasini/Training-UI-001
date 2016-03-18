sayHello = function()
{
	var name = document.getElementById("name").value;
	var sayHello = "Hello " + name + "!!! <br> Welcome to Training in GIT.";
	document.getElementById("sayHello").innerHTML = sayHello;
}

var emp_i=1;
var stud_i=1;
var id = 0;
var emp_rowIndex = 1;
var stud_rowIndex = 1;
var employees = [];
var hobby = [];
var hobbyid;
var gender;
var students = [];
var e_updateRowId = 0;
var s_updateRowId = 0;
var tableID;
var formID;
var entityID;
var textRegExp = /^[a-zA-Z]*$/;
var emailRegExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
var phRegExp = /^\d{10}$/;	
var dateRegExp = /^(([0-9])|([0-2][0-9])|([3][0-1]))\/((3[01]|[12][0-9]|0[1-9]))\/\d{4}$/;


function validateForm(i)
{
	var formObj = new Object();
	if(i==1)
	{	
		tableID = "empTableBody";
		entityID = "eid";
		formID = "employeeForm";
		id = 1;
		hobbyid = 1;
		if(document.getElementById('singing').checked)
		{
			hobby[hobbyid] = document.getElementById('singing').value;
			hobbyid++;
		}
		if(document.getElementById('dancing').checked)
		{
			hobby[hobbyid] = document.getElementById('dancing').value;
			hobbyid++;
		}
		if(document.getElementById('driving').checked)
		{
			hobby[hobbyid] = document.getElementById('driving').value;
			hobbyid++;
		}
		if(document.getElementById('female').checked)
		{
			gender = 'Female';
		}
		else
		if(document.getElementById('male').checked)
		{
			gender = 'Male'
		}

		if(document.getElementById('eid').value == "")
		{
			formObj = createObject(emp_i, document.getElementById('e_fname').value, document.getElementById('e_lname').value, document.getElementById('e_email').value, document.getElementById('e_ph').value, document.getElementById('e_department').value, document.getElementById('e_joiningDate').value, gender, hobby);
		}
		else 
		{
			formObj = createObject(document.getElementById('eid').value, document.getElementById('e_fname').value, document.getElementById('e_lname').value, document.getElementById('e_email').value, document.getElementById('e_ph').value, document.getElementById('e_department').value, document.getElementById('e_joiningDate').value, gender, hobby);
		}		
	}	

	var errorText = "";
		
	errorText = isEmpty(textRegExp,formObj.fname,"First Name") + isEmpty(textRegExp,formObj.lname,"Last Name") + isEmpty(emailRegExp,formObj.email,"Email") + isEmpty(phRegExp,formObj.ph,"Phone Number") + isEmpty("",formObj.department,"Department") +isEmpty(dateRegExp,formObj.joiningDate,"Joining Date") + isEmpty('',formObj.gender,"Gender") + isEmpty('',formObj.hobby,"Hobby");
	
	if(i==1)
	{
		document.getElementById('e_errorText').innerHTML = errorText ;
	}
	
	if(errorText=="")
	{
		if(i==1)
		{
			if(document.getElementById('eid').value == "")
			{
				employees = insertIntoTable(formObj,emp_rowIndex,tableID,entityID,employees);
				emp_i++;
				emp_rowIndex++;
			}
			else
			{
				employees = updateTable(formObj,e_updateRowId,tableID,entityID,employees);
			}
		}		
	}
}


function updateTable(obj,updateRowId,tableID,entityID,entity)
{
	var rowID = updateRowId + 1;
	var x = document.getElementById(tableID).rows;
	var y = x[updateRowId].cells;
		entity[rowID] = obj;
		y[0].innerHTML = entity[rowID].name;
		y[1].innerHTML = entity[rowID].email;
		y[2].innerHTML = entity[rowID].department;
		y[3].innerHTML = entity[rowID].joiningDate;
		y[4].innerHTML = entity[rowID].ph;
		y[5].innerHTML = "<button type='button' class='btn btn-primary active' onClick = 'deleteRow(this," + rowID + ",\"" + tableID + "\")'>Remove</button> <button type='button' class='btn btn-primary active' onClick = 'editRow(this,\"" + tableID + "\")'>Edit</button>";
	clearData(formID);
	document.getElementById(entityID).value = "";
	return entity;
}

function insertIntoTable(obj,rowIndex,tableID,entityID,entity)
{	
	var table = document.getElementById(tableID);
    var row = table.insertRow(rowIndex-1);
    var name = row.insertCell(0);
    var email = row.insertCell(1);
	var department = row.insertCell(2);
	var joiningDate = row.insertCell(3);
	var ph = row.insertCell(4);
	var action = row.insertCell(5);	
		
		entity[rowIndex] = obj;
		name.innerHTML = entity[rowIndex].name;
	    email.innerHTML = entity[rowIndex].email;
		department.innerHTML = entity[rowIndex].department;
		joiningDate.innerHTML = entity[rowIndex].joiningDate;
		ph.innerHTML = entity[rowIndex].ph;		    

	action.innerHTML = "<button type='button' class='btn btn-primary active' onClick = 'deleteRow(this," + rowIndex + ",\"" + tableID + "\")'>Remove</button> <button type='button' class='btn btn-primary active' onClick = 'editRow(this,\"" + tableID + "\")'>Edit</button>";
	clearData(formID);
	document.getElementById(entityID).value = "";
	return entity;
}

function deleteRow(index,rowIndex,tableID)
{
	var row = index.parentNode.parentNode.rowIndex;
	document.getElementById(tableID).deleteRow(row-1);
	if(tableID == "empTableBody")
	{
		employees.splice(rowIndex,1);
		emp_rowIndex--;
	}	
}

function editRow(index,tableID)
{
	var rowID = (index.parentNode.parentNode.rowIndex);
	if(tableID == "empTableBody")
	{
		e_updateRowId = rowID - 1;
		document.getElementById('eid').value = employees[rowID].empid;
		document.getElementById('e_fname').value = employees[rowID].fname;
		document.getElementById('e_lname').value = employees[rowID].lname;
		document.getElementById('e_email').value = employees[rowID].email;
		document.getElementById('e_ph').value = employees[rowID].ph;
		document.getElementById('e_department').value = employees[rowID].department;
		document.getElementById('e_joiningDate').value = employees[rowID].joiningDate;
		document.getElementById(employees[rowID].gender).checked = true;
		for(i=1; i<=employees[rowID].hobby.length; i++)
		{
			document.getElementById(employees[rowID].hobby[i]).checked = true;
		}
	}	
}

function clearData(formID)
{
	document.getElementById(formID).reset();
	if(formID=="employeeForm")
	{
		document.getElementById('e_errorText').innerHTML = "" ;
	}	
}

function isEmpty(regExp, checkValue, textVal)
{	
	console.log(checkValue);
	if(textVal=="Hobby"){
  		if(checkValue.length == 0)
  		{
  			errorText = "Select a value for " + textVal + ". <br/>";	
  		}
  		else
  		{
  			errorText = '';
  		}
  		return errorText;
  	}
	if(checkValue == "")
	{
		var errorText = "";
		errorText = " " + textVal + " should be filled. <br/> ";
		return errorText;
	}
	else
	{
		if((textVal!="Department")&&(textVal!="Gender")&&(textVal!="Hobby"))
		{
			return checkRegExp(regExp, checkValue, textVal);
		}		
		else
		{
		  	if(textVal=="Gender")
		  	{
		  		if(checkValue === undefined)
		  		{
		  			errorText = "Select a value for " + textVal + ". <br/>";
		  		}
		  		else
		  		{
		  			errorText = '';
		  		}
		  		return errorText;
		  	}		  	
		  	else
		  	{
		  		return "";
			}
		}
	}
}

function checkRegExp(regExp, checkVal, textVal)
{
	if((!regExp.test(checkVal)))
	{
		var errorRegExp = "Enter a valid " + textVal + ". <br/>";
		return errorRegExp;
	}
	else
	{
	    return "";
	}
}

function createObject(id, firstname, lastname, emailid, phone, dept, doj, gender, hobby)
{
	var obj = {
			empid : id,
			fname : firstname,
			lname : lastname,
			name : firstname + ' ' + lastname,
			email : emailid,
			ph : phone,
			department : dept,
			joiningDate : doj,
			gender : gender,
			hobby : hobby
	}	
	return obj;
}

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
});