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
	$scope.loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
	$scope.navigateToGridPage = function()
	{
		console.log("calling Navidate to grid page");
		$window.location.href = 'MyFirstAngularGrid.html';
	}
}]);
app.controller('GridController',['$scope','$window', '$location', '$http', '$filter',
	function($scope, $window, $location, $http, $filter){		
		
        var url = "http://127.0.0.1:8000/Test%20Folder%201/AngularGridTask.csv";
        //var url = "http://127.0.0.1:8000/Test%20Folder%201/gridData.json";
        //var url = "file:///opt/Training/Test Simple HTTP Server/Test Folder 1/gridData.json";
        
	    $http.get(url).success( function(response) {	     		     	
	     	$scope.myData = response.split("\n");
	     	$scope.myData.splice($scope.myData.length-1 , 1);	     	
	     	$scope.jsonData = [];
	     	$scope.rowData = [];
	     	$scope.header = [];
	     	angular.forEach($scope.myData, function(val,key){	     		
	     		$scope.rowData.push(val.split(","));	     		
	     	});
	     	$scope.header = $scope.rowData[0];	 

	     	angular.forEach($scope.rowData, function(value,key){
	     		var jsonText = [];
	     		if(key > 0)
	     		{
	     			angular.forEach($scope.header,function(headerVal, headerKey){
	     				jsonText[headerVal] = value[headerKey];	     				    				
	     			});	     			
	     			$scope.jsonData.push(jsonText);	     			
	     		}	     		
	     	});	 
	     	$scope.jsonDataBackup = $scope.jsonData;
	     	//$scope.jsonDataBackup = angular.copy($scope.jsonData);
	     	console.log($scope.jsonData);    
	     	//console.log($scope.jsonDataBackup);    
	     	/*$scope.$watch('filterText',function(newVal, oldVal){
		    	if(newVal == '')
		    	{
		    		console.log($scope.jsonDataBackup);
		    		$scope.jsonData = angular.copy($scope.jsonDataBackup);
		    	}
		    	else
		    	{
		    		console.log($filter('filter')($scope.jsonData, $scope.jsonData['Name']));
		    	}
		    }, true);	*/
	    });

	    var toggle = true;
	    $scope.sortData = function(i){
	    	toggle = !toggle;	    	
	    	$scope.jsonData = $filter('orderBy')($scope.jsonData, $scope.header[i],toggle);
	    }	    
	   
	    /*
         $scope.gridOptions = { 
         	data: 'jsonData',
         	columnDefs: [{field: 'name', displayName: 'Name'},
         				{field: 'age', displayName: 'Age'}]
         };	*/
}]);