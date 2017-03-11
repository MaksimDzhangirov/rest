'use strict';
yii2AngApp_company.factory("company_services", ['$http', '$location', '$route',
	function($http,$location,$route) {
		var obj = {};
		obj.getCompanies = function() {			
			return $http.get(serviceBase + 'companies');
		}
		obj.createCompany = function (company) {
			return $http.post( serviceBase + 'companies', company)
				.then( successHandler )
				.catch( errorHandler );
			function successHandler(result) {
				$location.path('/company/index');
			}
			function errorHandler(result) {
				alert('Error data');
				$location.path('/company/create');
			}
		}
		obj.getCompany = function(companyID) {
			return $http.get(serviceBase + 'companies/' + companyID);
		}
		obj.updateCompany = function(company) {
			return $http.put(serviceBase + 'companies/' + company.id, company)
				.then( successHandler )
				.catch( errorhandler );
			function successHandler(result) {
				$location.path('/company/index');
			}
			function errorhandler(result) {
				alert('Error data');
				$location.path('/company/update/' + company.id);
			}
		}
		obj.deleteCompany = function (companyID) {
        return $http.delete(serviceBase + 'companies/' + companyID)
            .then( successHandler )
            .catch( errorHandler );
        function successHandler( result ) {
            $route.reload();
        }
        function errorHandler( result ){
            alert("Error data");
            $route.reload();
        }    
    };    
    return obj;  
}]);
