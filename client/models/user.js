'use strict';
yii2AngApp_user.factory("user_services", ['$http', '$location', '$route',
	function($http,$location,$route) {
		var obj = {};
		obj.getUsers = function() {			
			return $http.get(serviceBase + 'users');
		}
		obj.createUser = function (user) {
			return $http.post( serviceBase + 'users', user)
				.then( successHandler )
				.catch( errorHandler );
			function successHandler(result) {
				$location.path('/user/index');
			}
			function errorHandler(result) {
				alert('Error data');
				$location.path('/user/create');
			}
		}
		obj.getUser = function(userID) {
			return $http.get(serviceBase + 'users/' + userID);
		}
		obj.updateUser = function(user) {
			return $http.put(serviceBase + 'users/' + user.id, user)
				.then( successHandler )
				.catch( errorhandler );
			function successHandler(result) {
				$location.path('/user/index');
			}
			function errorhandler(result) {
				alert('Error data');
				$location.path('/users/update/' + user.id);
			}
		}
		obj.deleteUser = function (userID) {
        return $http.delete(serviceBase + 'users/' + userID)
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
