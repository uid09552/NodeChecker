/**
 * Created by Max on 23.06.15.
 */

var testApp=angular.module('app',['ngRoute','Login']);

testApp.config(function ($routeProvider,$locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/auth',
            controller: 'Login'
        })
        .when('/mongo',{
            templateUrl: '/mongo',
            controller: 'Login'
        })
            .otherwise({
                redirectTo:'/login'
            });
});

/* CONTROLLER MAIN FORM */
testApp.controller('MainCt' +
'rl', function ($scope) {
    console.log("APP STARTED");
});