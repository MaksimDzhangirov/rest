'use strict';
yii2AngApp_report.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/report/index', {
        templateUrl: 'views/report/index.html',
        controller: 'report_index'
    })    
    .otherwise({
        redirectTo: '/report/index'
    });
}]);

yii2AngApp_user.controller('report_index', ['$scope', '$http', '$route', 'user_services', 'company_services',
    function($scope,$http,$route, user_services, company_services) {
    $scope.message = 'Simple API that allows to work with users, companies, generate data and provide reports.';
    
    user_services.getUsers().then(function(data){
        $scope.users = data.data;             
    }); 
        
    company_services.getCompanies().then(function(data){
        $scope.companies = data.data;
    });    
        $scope.reportShow = false;
        
    $scope.generateData = function() {

    };

    $scope.showReport = function(date) {
        $scope.reportShow = true;
        $scope.report = [{'company_name' : 'Intel', 'used': 15000000, 'quota': 10000000}];
        console.log($scope);
        //$route.reload();        
    }

}]);