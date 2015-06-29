/**
 * Created by Max on 22.06.15.
 */

var app=angular.module('Login',['ngRoute']);



app.controller('Login',function($scope,$http,$location){

    $scope.controllerStat="OK";

    $scope.loginclick=function(){
        setAuthToken("auth", $http, $scope, $location)
    };

    console.log($scope);
    $scope.pwd;
    $scope.user;
});


function setAuthToken(path, $http, $scope, $location)
{
    $http.post(path, {Name:$scope.user,pwd:$scope.pwd}).
        success(function(data, status, headers, config) {

            if (data.success)
            {
                $http.defaults.headers.common["X-AUTH-TOKEN"]=data.token;
                console.log('Token set');
                $location.path('/filesystem');
               // window.location.href='/filesystem';
            }else
            {
                alert("authentication failed");
            }

        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('auth error');
        });
}
