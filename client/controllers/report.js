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

yii2AngApp_user.controller('report_index', ['$scope', '$http', '$route', 'report_services',
    function($scope,$http,$route, report_services) {
    $scope.message = 'Simple API that allows to work with users, companies, generate data and provide reports.';
       
    $scope.reportShow = false;
    var dates = [];
    var date = new Date();    
    for (var i = 6; i>=0; i--) {
        var date = new Date();
        date.setDate(date.getDate()-i*28);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year =  date.getFullYear();
        var obj = {};
        obj.number = year + '-' + month + '-01';
        obj.string = date.toLocaleString("en-US", {month: 'long', year: 'numeric'});
        dates.push(obj);
    }
    
    $scope.dates = dates;
    $scope.generateData = function() {        
        report_services.generate();
    };

    $scope.showReport = function(date) {
        $scope.reportShow = true;
        var d = new Date(Date.parse(date));

        $scope.text_message = 'Sample report for ' + d.toLocaleString("en-US", {month: 'long', year: 'numeric'});
        report_services.getAbusers(date).then(function(data){
            $scope.abusers = data.data;             
        });  
        report_services.getReport(date).then(function(data){
            $scope.report = data.data;
        });         
    }

}]);