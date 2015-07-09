/**
 * Created by Max on 23.06.15.
 */

var testApp=angular.module('app',['ngRoute','Login','start']);

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
        .when('/filesystem',{
            templateUrl: '/filesystem'
        })
        .when('/start',{
            templateUrl: '/start',
            controller: 'start'
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


testApp.factory('SessionState',function(){
    var isAuthenticated=false;
    var token;
    return {
        isAuthenticated:function(){
            return isAuthenticated;
        },
        setAuth: function(value)
        {
            isAuthenticated=value;
        },
        getToken: function()
        {
            return token;
        },
        setToken: function(value)
        {
            token=value;
        }
    }
});

testApp.run(function($rootScope,$location,SessionState){
    $rootScope.$on('$routeChangeStart',
    function(event,next,current){
        if (!SessionState.isAuthenticated())
        {
          $location.path("/");

        }
        else
        {

        }
    });

});

