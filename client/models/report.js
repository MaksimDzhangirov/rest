'use strict';
yii2AngApp_report.factory("report_services", ['$http', '$location', '$route',
	function($http,$location,$route) {
		var obj = {};
		obj.getAbusers = function(date) {			
			return $http.get(serviceBase + 'transfers/abusers/' + date);
		}
		obj.getReport = function(date) {
			return $http.get(serviceBase + 'transfers/report/' + date);
		}
		obj.generate = function() {
			return $http.post(serviceBase + 'transfers/generate')
				.then( successHandler )
				.catch( errorhandler );
			function successHandler(result) {
				alert('Data was successfully generated');
				$location.path('/report/index');
			}
			function errorhandler(result) {
				alert('Error during data generation');
				$location.path('/report/index/');
			}
		}		   
    return obj;  
}]);
