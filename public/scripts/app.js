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


testApp.service('SessionService',function(){
   var isAuthenticated=false;
    var token="";
  function setAuthentication(value)
  {
      this.isAuthenticated=value;
  }
    function getAuthentication(){
        return this.isAuthenticated;
    }

    function setToken(value)
    {
        this.token=value;
    }
    function getToken()
    {
        return this.token;
    }
});

