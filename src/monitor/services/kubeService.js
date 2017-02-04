kubeApp.service('KubeService', function($q, $http, constants) {

    return {

        executeGet: function(endpoint) {
            return $http({
                url: constants.getUrl(endpoint),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': constants.getCredentials()
                }
            }).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(message) {
                console.log(message);
                return null;
            });
        }
    };
});