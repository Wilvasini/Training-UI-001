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
	$("#e_ph").keypress(function(){		
		onlyNumbers(event);	
	});
});

function onlyNumbers(e) {  
    numcheck = /\d/;     
	return numcheck.test(String.fromCharCode(e.keyCode));
}  

var app = angular.module('myFirstGitApp', ['ngGrid']);
app.controller('NavigateController',['$scope','$window', '$location',
	function($scope, $window, $location){
	$scope.text = "sample";
	$scope.navigateToGridPage = function()
	{
		console.log("calling Navidate to grid page");
		$window.location.href = 'MyFirstAngularGrid.html';
	}
}]);
app.controller('GridController',['$scope','$window', '$location', '$http',
	function($scope, $window, $location, $http){
		/*$scope.myData = [{name: "Moroni", age: 50},
                 {name: "Tiancum", age: 43},
                 {name: "Jacob", age: 27},
                 {name: "Nephi", age: 29},
                 {name: "Enos", age: 34}];*/
        var url = "http://127.0.0.1:8000/Test%20Folder%201/gridData.json";

	    $http.get(url).success( function(response) {
	     	$scope.myData = response; 
	    });
         $scope.gridOptions = { 
         	data: 'myData',
         	columnDefs: [{field: 'name', displayName: 'Name'},
         				{field: 'age', displayName: 'Age'}]
         };	
}]);