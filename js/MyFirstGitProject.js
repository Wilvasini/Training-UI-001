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
        //var url = "file:///opt/Training/Test Simple HTTP Server/Test%20Folder%201/gridData.json";
        
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
	     		var jsonText = {};
	     		if(key > 0)
	     		{
	     			angular.forEach($scope.header,function(headerVal, headerKey){
	     				jsonText[headerVal] = value[headerKey];	     				    				
	     			});	     			
	     			$scope.jsonData.push(jsonText);	     			
	     		}	     		
	     	});	 
	     	
	     	$scope.paginationLimit = 5;
		    $scope.beginingLimit = 0;
		    $scope.pageNo = 1;
		    $scope.pageSize = ($scope.jsonData.length)/$scope.paginationLimit;		    
	    });

	    $scope.setPageLimit = function(limit){
	    	$scope.paginationLimit = limit;
	    	$scope.pageSize = ($scope.jsonData.length)/$scope.paginationLimit;
	    	$scope.beginingLimit = 0; //$scope.beginingLimit - $scope.paginationLimit;	    	
	    }
	    $scope.range = function(n) {
	        return new Array(n);
	    };
	    $scope.pagination = function(pageNo)
	    {
	    	$scope.pageNo = pageNo;
	    	$scope.beginingLimit = ((pageNo-1)*$scope.paginationLimit);	    	
	    }  
	    $scope.next = function(){	    
	    	if(($scope.pageNo*$scope.paginationLimit)>=($scope.jsonData.length))
	    	{
	    		return false;
	    	}
	    	$scope.pageNo += 1;
	    	$scope.pagination($scope.pageNo);	    	
	    }
	    $scope.previous = function(){	    	
	    	if($scope.pageNo == 1)
	    	{
	    		return false;
	    	}
	    	$scope.pageNo -= 1;
	    	$scope.pagination($scope.pageNo);
	    }

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