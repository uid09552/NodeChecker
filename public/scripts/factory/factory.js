/**
 * Created by Max on 18.07.2015.
 */
var factory=angular.module('app.factory', []);

factory.factory('SessionState',function(){
var isAuthenticated=false;
var token;
    var username;
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
    },
    getUser: function()
    {
        return username;
    },
    setUser: function(value)
    {
        username=value;
    }
}});
