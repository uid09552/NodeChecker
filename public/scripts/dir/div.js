/**
 * Created by Max on 07.07.15.
 */

var div=angular.module('app.div',[]);

div.directive('ngDiv',function($log){
    var directiveDefintionObject={
        template:'<div>Hallo welt from custom div<p ng-transclude></p> </div>',
        replace:true,
        transclude:true,
        link: function(scope,element,attr){
            element.bind('click',function(){
                $log.info('directive clicked');
                element.unbind('click');
                element.remove();
            });
            element.bind('$destroy',function(){
               $log.info(element);
                $log.info('destroyed');
            });
        }
    };


    return directiveDefintionObject;
});