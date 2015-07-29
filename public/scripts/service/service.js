/**
 * Created by Max on 16.07.15.
 */
var service=angular.module('app.service', []);

service.service('FileData',function($log){
   //privater Bereich
    return {
        //public Rückgabe
        getFileData: function(){
            $log.info('getFileData called');
            return [{Message:"Test"},{Message:"Test2"}];

        }
    };
});


