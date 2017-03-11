'use strict';
yii2AngApp_site.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
        templateUrl: 'views/site/index.html',
        controller: 'index'
    })
    .otherwise({
        redirectTo: '/'
    });

}])
.controller('index', ['$scope', '$http', function($scope,$http) {
    // create a message to display in our view    
    $scope.message = 'Simple API that allows to work with users, companies, generate data and provide reports.';
}]);