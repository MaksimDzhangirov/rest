'use strict';
// adjust to the your url of web service
var serviceBase = 'http://server.loc/'
// declare app level module which depends on views, and components
var yii2AngApp = angular.module('yii2AngApp', [
  'ngRoute',
  'rt.select2',
  'yii2AngApp.site',
  'yii2AngApp.company',
  'yii2AngApp.user',
  'yii2AngApp.report',
]);
// sub module declaration
var INTEGER_REGEXP = /^\+?\d+$/;
yii2AngApp.directive('integer', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.integer = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {

          return true;
        }

        if (INTEGER_REGEXP.test(viewValue)) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
});

var yii2AngApp_site = angular.module('yii2AngApp.site', ['ngRoute']);
var yii2AngApp_company = angular.module('yii2AngApp.company', ['ngRoute']);
var yii2AngApp_user = angular.module('yii2AngApp.user', ['ngRoute']);
var yii2AngApp_report = angular.module('yii2AngApp.report', ['ngRoute']);

yii2AngApp.config(['$routeProvider', function($routeProvider) {
  // config default route
  $routeProvider.otherwise({redirectTo: '/'});
}]);