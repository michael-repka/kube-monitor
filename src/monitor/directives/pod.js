'use strict';

kubeApp.directive("podHeader", function ($state, KubeService, constants) {
    return {
        restrict: "E",
        scope: {
            pod: '=podData',
            model: "="
        },
        templateUrl: "monitor/directives/pod.html",
        controller: function ($scope) {

            $scope.onClick = function() {
                //getPodLogs(); <-- 502 Bad Gateway!!
                getPodInfo();                
            };

            function getPodInfo(){
                var endpoint = constants.KUBERNETES_POD + '/' + $scope.pod.namespace + '/' + $scope.pod.name;
                KubeService.executeGet(endpoint)
                .then(function(data){

                    $scope.$parent.$parent.podInfo.namespace = data.objectMeta.namespace;
                    $scope.$parent.$parent.podInfo.name = data.objectMeta.name;
                    $scope.$parent.$parent.podInfo.creationTime = data.objectMeta.creationTimestamp;
                    $scope.$parent.$parent.podInfo.status = data.podPhase;
                    $scope.$parent.$parent.podInfo.podIP = data.podIP;
                    $scope.$parent.$parent.podInfo.restartCount = data.restartCount;
                    $scope.$parent.$parent.podInfo.nodeName = data.nodeName;

                }, function(error) {
                    console.log(error);
                });
            }

            function getPodLogs(){
                var endpoint = constants.KUBERNETES_POD + '/' + $scope.pod.namespace + '/' + $scope.pod.name + constants.KUBERNETES_LOG + '?follow=true';
                KubeService.executeGet(endpoint)
                .then(function(data){
                    if(data !== undefined || data !== null){
                        $scope.$parent.$parent.podInfo.logs = data.logs.join("\n");
                    }
                }, function(error) {
                    console.log(error);
                });
            }
        }
    };
});