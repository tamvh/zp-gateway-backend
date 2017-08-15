/* global theApp */

(function(){
    'use strict';

    theApp.controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', 'DashboardService', 'LoginService', '$rootScope', '$uibModal', '$timeout', '$location'];
    function DashboardController($scope, DashboardService, LoginService, $rootScope, $uibModal, $timeout, $location){			        
        if(!LoginService.isLogined()){
            $location.path("/login");
            return ;
        }
        $scope.listSummary = {};
        $scope.date = new Date();
        $scope.getSummary = function(){
            var date = $scope.date.getFullYear() + "-" + ($scope.date.getMonth() +1) + "-" + $scope.date.getDate();			
            DashboardService.getSummary(date).then(function(response){
                if(response.err === 0){
                    $scope.listSummary = response.dt;
                    console.log(JSON.stringify($scope.listSummary));
                } else if (response.err === 101) {
                    
                }else{
                    console.log("error get summary in dashboard");
                }

            });
        };
        $scope.getSummary();        
    }
})();