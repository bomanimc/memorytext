var memoryModule = angular.module('memorytext', ['ngRoute']);

memoryModule.config(function($routeProvider){
	$routeProvider.
	when('/', 
		{templateUrl:'partials/home.html', controller: homeControl}).
	when('/form', 
		{templateUrl:'partials/form.html', controller: formControl}).
	otherwise({redirectTo: '/'});
	
});




