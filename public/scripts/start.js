/**
 * Created by Max on 02.07.15.
 */

var start=angular.module('start',['app.div','app.service','app.factory']);

start.run(function(){
   console.log('start app loaded');
});

start.controller('start',function($scope){
    $scope.mouseclickp=1;
    $scope.inputtest="a";
    $scope.onchangediv=0;
    $scope.checked=true;
    $scope.textwidth=200;
    $scope.textclass="text-left";
    $scope.mouseclick=function(){
      $scope.mouseclickp=$scope.mouseclickp+1;
        console.log(this.mouseclickp);

    };
    $scope.clickreset=function(event){
        $scope.mouseclickp=0;
        console.log(event);
    };

    $scope.onchange=function(event){

        console.log(event);
        ++$scope.onchangediv;
        console.log($scope.onchangediv);
    }

});

start.controller('module',function($scope,FileData){

    $scope.FileMessage=FileData.getFileData();
    console.log($scope.FileMessage[0].Message);
});

start.controller("forms",function($scope,SessionState){
   $scope.email;
    console.log(SessionState.isAuthenticated());
});


start.controller("cfAppStatsCtrl",function($scope,$http)
{


});

start.controller('cfListAppsCtrl',function($scope,$http){
   console.log('getting all Apps');
  $scope.AllApps;
  $scope.cfAppListvisible=false;
    $scope.getCFAllApps=function() {
            $http.get('api/cf/ListApps').success(
                function (data, status, headers, config) {

                    $scope.AllApps = data;
                    console.log('AllApps set');
                    console.log(data);
                    $scope.cfAppListvisible=false;
                }
            ).error(function (data, status, headers, config) {

                    $scope.AllApps = "";
                    console.error(data);
                });
    }
    $scope.getCFAllApps();
    $scope.cfAppListvisible=true;
});



start.controller("filesystemCtrl",function($scope,$http){
    console.log("Filesystem ctrl");
    $scope.PerfData;


    $scope.getFilesystem=function()
    {
        console.log('getting Healthcheck')


        $http.get('api/getfilesystem').success(
            function(data,status,headers,config)
            {
                 $scope.PerfData=data;
            }
        ).error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('auth error');
            });
    };
   $scope.getFilesystem();
});



