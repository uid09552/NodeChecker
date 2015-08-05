/**
 * Created by Max on 22.06.15.
 */

var app=angular.module('Login',['ngRoute','app.factory']);



app.controller('Login',function($scope,$http,$location,SessionState){

    $scope.controllerStat="OK";

    $scope.loginclick=function(){
        setAuthToken("api/cf/token", $http, $scope, $location,SessionState)
    };

    console.log($scope);
    $scope.pwd;
    $scope.user;
});


function setAuthToken(path, $http, $scope, $location,SessionState)
{
    $http.post(path, {username:$scope.user,password:$scope.pwd}).
        success(function(data, status, headers, config) {
            console.log(data);
            if (data.Authenticated && headers('Authorization')!=null)
            {
                $http.defaults.headers.common["Authorization"]=headers('Authorization');
                $http.defaults.user=$scope.user;
                console.log('Token set');
                SessionState.setToken(headers('Authorization'));
                SessionState.setAuth(true);
                console.log(headers('Authorization'));
                $location.path('/start');
               // window.location.href='/filesystem';
            }else
            {
                SessionState.setToken("");
                SessionState.setAuth(false);
                $http.defaults.headers.common["Authorization"]="";
                $http.defaults.user="";
                console.log('Authentication failed');
                alert("authentication failed");
            }

        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('auth error');
        });
}
