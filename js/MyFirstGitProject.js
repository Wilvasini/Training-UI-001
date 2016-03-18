sayHello = function()
{
	var name = document.getElementById("name").value;
	var sayHello = "Hello " + name + "!!! <br> Welcome to Training in GIT.";
	document.getElementById("sayHello").innerHTML = sayHello;
}

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
});