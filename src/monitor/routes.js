angular.module('kubemonitor.routes', [])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: 'monitor/templates/main.html',
            controller: 'mainController'
        })

    $urlRouterProvider.otherwise('/main')
}]);