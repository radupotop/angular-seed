/*
 Main application module.
*/
var App = angular.module('App', ['ngRoute', 'ngResource']);

/*
 App configuration. Enable things as needed.
*/
App.config(function($logProvider, $routeProvider, $httpProvider){

    $logProvider.debugEnabled(localStorage.debug == true); // jshint ignore:line

    // $httpProvider.interceptors.push('HttpInterceptor');

    // $httpProvider.defaults.headers.common.Accept = 'application/json';

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

});

App.run(function(){
	
});
