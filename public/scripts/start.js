/**
 * Created by Max on 02.07.15.
 */

var start=angular.module('start',['app.div','app.service','app.factory']);

start.run(function(){
   console.log('start app loaded');
});

start.controller('start',function($scope,SessionState){
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

start.controller('navCtrl',function($scope,SessionState){
    $scope.UserName=SessionState.getUser();

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

start.controller('cfOrgListCtrl',function($scope,$http){
   $scope.AllData;

   $scope.hiddenAllData=false;

   $scope.getProgressBarMaxValue=function(org_guid){
       if ($scope.AllData!=null)
       {
           var i;
           for (i=0;i< $scope.AllData.orgs;i++)
           {
               if ($scope.AllData.orgs[i].Org_GUID==org_guid)
               {
                   return $scope.AllData.orgs[i].quota.entity.memory_limit;

               }
           }
       }
   }
    $scope.getProgressbarAllocatedQuota=function(org_guid)
    {
        if ($scope.AllData!=null)
        {
            var i;
            for (i=0;i< $scope.AllData.orgs;i++)
            {
                if ($scope.AllData.orgs[i].Org_GUID==org_guid)
                {
                    console.log( parseInt($scope.AllData.orgs[i].quotaPerc));
                    return parseInt($scope.AllData.orgs[i].quotaPerc);

                }
            }
        }
    }
    $scope.getProgressBarAllocatedValue=function(org_guid){
        if ($scope.AllData!=null)
        {
            var i;
            for (i=0;i< $scope.AllData.orgs;i++)
            {
                if ($scope.AllData.orgs[i].Org_GUID==org_guid)
                {
                    return $scope.AllData.orgs[i].allocatedOrg_Memory;

                }
            }
        }
    }

   $scope.getAllData=function(){
       $http.get('api/cf/AllData').success(
           function (data, status, headers, config) {

               $scope.AllData = data;
               console.log("AllData fetched");
           }
       ).error(function (data, status, headers, config) {

               $scope.AllData = "";
               console.error(data);
           });
   }
    $scope.getAllData();


});

start.controller('cfListAppsCtrl',function($scope,$http){


  $scope.AllApps;
  $scope.cfAppListvisible;


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
  //  $scope.getCFAllApps();
    $scope.cfAppListvisible=true;




    $scope.appDetails=function(guid)
    {
        console.log(guid);
        $http.post('api/cf/AppUsageInfo',{"guid":guid}).success(
            function (data, status, headers, config) {

               var AllApps= $scope.AllApps;

            }
        ).error(function (data, status, headers, config) {
               console.error(data);
            });
    }





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



