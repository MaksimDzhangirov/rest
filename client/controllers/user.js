'use strict';
yii2AngApp_user.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/user/index', {
        templateUrl: 'views/user/index.html',
        controller: 'index'
    })
    .when('/user/create', {
        templateUrl: 'views/user/create.html',
        controller: 'create',
        resolve: {
            user: function(user_services, $route){
                return user_services.getUsers();
            }
        }
    })
    .when('/user/update/:userId', {
        templateUrl: 'views/user/update.html',
        controller: 'update',
        resolve: {
          user: function(user_services, $route){
            var userId = $route.current.params.userId;
            return user_services.getUser(userId);
          }
        }
    })
    .when('/user/delete/:userId', {
        templateUrl: 'views/user/index.html',
        controller: 'delete',
    })
    .otherwise({
        redirectTo: '/user/index'
    });
}]);

yii2AngApp_user.controller('index', ['$scope', '$http', 'user_services', 'company_services',
    function($scope,$http,user_services, company_services) {
    $scope.message = 'Simple API that allows to work with users, companies, generate data and provide reports.';
    
    user_services.getUsers().then(function(data){
        $scope.users = data.data;             
    }); 
        
    company_services.getCompanies().then(function(data){
        $scope.companies = data.data;
    });    
    
    $scope.getCompany = function(company_id, companies) {
        if (companies) {
            for (var i = 0; i <= companies.length; i++) {
                if (company_id == companies[i].id) {
                    return companies[i].company_name;
                }
            }
        }        
    }
    
    $scope.deleteUser = function(userID) {
        if(confirm("Are you sure to delete user with ID: " + userID)==true && userID>0){
            user_services.deleteUser(userID);    
            //$route.reload();
        }
    };
}])
.controller('create', ['$scope', '$http', 'user_services','$location','user', 'company_services',
    function($scope,$http,user_services,$location,user, company_services) {
    $scope.message = 'Simple API that allows to work with users, companies, generate data and provide reports.';
    $scope.createUser = function(user) {
        var results = user_services.createUser(user);
    } 
    company_services.getCompanies().then(function(data){
        $scope.companies = data.data;
    });  
}])
.controller('update', ['$scope', '$http', '$routeParams', 'user_services','$location','user', 
    function($scope,$http,$routeParams,user_services,$location,user) {
    $scope.message = 'Simple API that allows to work with users, companies, generate data and provide reports.';
    var original = user.data;
    $scope.user = angular.copy(original);
    $scope.isClean = function() {
        return angular.equals(original, $scope.user);
    }
    $scope.updateUser = function(user) {    
        var results = user_services.updateUser(user);
    } 
}]);