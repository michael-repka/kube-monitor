kubeApp.controller('mainController', function($scope, KubeService, constants) {

    $scope.pods = [];

    $scope.podInfo = {};
    $scope.podInfo.logs = '';
    $scope.podInfo.namespace = '';
    $scope.podInfo.name = '';
    $scope.podInfo.creationTime = '';
    $scope.podInfo.status = '';
    $scope.podInfo.podIP = '';
    $scope.podInfo.restartCount = '';
    $scope.podInfo.nodeName = '';

    $scope.loadPods = function() {
        getPods();
    };

    function getPods() {    	
        KubeService.executeGet(constants.KUBERNETES_POD)
        .then(function(data){
	        for (var i = 0; i < data.pods.length; i++) {
	        	if (data.pods[i].objectMeta.labels === undefined || data.pods[i].objectMeta.labels.app === undefined)
	                continue;

	            var pod = [];
	            pod['namespace'] = data.pods[i].objectMeta.namespace;
	            pod['name'] = data.pods[i].objectMeta.name;
	            pod['container'] = data.pods[i].objectMeta.labels.app;

	            $scope.pods.push(pod);
	        }
        }, function(error) {
            //some error
            console.log(error);
        });
    };
});