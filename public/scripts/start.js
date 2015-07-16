/**
 * Created by Max on 02.07.15.
 */

var start=angular.module('start',['app.div','app.service']);

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

