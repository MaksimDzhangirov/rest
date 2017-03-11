'use strict';
yii2AngApp_company.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/company/index', {
        templateUrl: 'views/company/index.html',
        controller: 'company_index'
    })
    .when('/company/create', {
        templateUrl: 'views/company/create.html',
        controller: 'company_create',
        resolve: {
            company: function(company_services, $route){
                return company_services.getCompanies();
            }
        }
    })
    .when('/company/update/:companyId', {
        templateUrl: 'views/company/update.html',
        controller: 'company_update',
        resolve: {
          company: function(company_services, $route){
            var companyId = $route.current.params.companyId;
            return company_services.getCompany(companyId);
          }
        }
    })
    .when('/company/delete/:companyId', {
        templateUrl: 'views/company/index.html',
        controller: 'delete',
    })
    .otherwise({
        redirectTo: '/company/index'
    });
}]);

yii2AngApp_company.controller('company_index', ['$scope', '$http', 'company_services', 
    function($scope,$http,company_services) {
    $scope.message = 'Simple API that allows to work with users, companies, generate data and provide reports.';
    console.log(123);
    company_services.getCompanies().then(function(data){
        $scope.companies = data.data;
    });    
    $scope.deleteCompany = function(companyID) {
        if(confirm("Are you sure to delete company with ID: " + companyID)==true && companyID>0){
            company_services.deleteCompany(companyID);    
            //$route.reload();
        }
    };
}])
.controller('company_create', ['$scope', '$http', 'company_services','$location','company', 
    function($scope,$http,company_services,$location,company) {
    $scope.message = 'Simple API that allows to work with users, companies, generate data and provide reports.';
    $scope.createCompany = function(company) {
        var results = company_services.createCompany(company);
    }  
}])
.controller('company_update', ['$scope', '$http', '$routeParams', 'company_services','$location','company', 
    function($scope,$http,$routeParams,company_services,$location,company) {
    $scope.message = 'Simple API that allows to work with users, companies, generate data and provide reports.';
    var original = company.data;
    $scope.company = angular.copy(original);
    $scope.isClean = function() {
        return angular.equals(original, $scope.company);
    }
    $scope.updateCompany = function(company) {    
        var results = company_services.updateCompany(company);
    } 
}]);