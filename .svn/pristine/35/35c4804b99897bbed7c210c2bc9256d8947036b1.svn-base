/* global theApp */

(function() {
    'use strict';
    theApp.controller('ReportByDateController', ReportByDateController);

    ReportByDateController.$inject = ['$scope', 'ReportService', '$rootScope', '$filter', '$location', 'LoginService', '$uibModal', '$mdDialog', '$confirm'];
    function ReportByDateController($scope, ReportService, $rootScope, $filter, $location, LoginService, $uibModal, $mdDialog, $confirm) {
        if(!LoginService.isLogined()){
            $location.path("/login");
            return ;
        }

        var toDay = new Date();
        var lastMonth = new Date(toDay.getFullYear(), toDay.getMonth() - 1, toDay.getDate());
        $scope.fromDate = lastMonth;
        $scope.toDate = new Date();
        $scope.totalRecordPerPage = 50;
        $scope.totalRecordPerPageList = [10, 30, 50, 100];
        $scope.currentPage = 1;
        $scope.maxSize = 10;

        $scope.listSummary = [];
        $scope.totalRecord = 0;

        $scope.loadListSummaryOfPage = function(currentPage, totalRecordPerPage) {
            var fromDate = "";
            var toDate = "";

            if ($scope.fromDate !== "") {
                fromDate = $scope.fromDate.getFullYear() + "-" + ($scope.fromDate.getMonth() + 1) + "-" + $scope.fromDate.getDate();
            }

            if ($scope.toDate !== "") {
                toDate = $scope.toDate.getFullYear() + "-" + ($scope.toDate.getMonth() + 1) + "-" + $scope.toDate.getDate();
            }

            ReportService.getReportByDateOfPage(fromDate, toDate, currentPage, totalRecordPerPage)
                    .then(function(response) {
                        if (response.err === 0) {
                            $scope.currentPage = currentPage;
                            $scope.listSummary = response.dt.listSummary;
                            console.log(JSON.stringify($scope.listSummary));
                            $scope.totalRecord = response.dt.totalRecord;
                            $scope.totalRevenue = response.dt.totalRevenue;
                            $scope.totalInvoice = response.dt.totalInvoice;

                        } else if (response.err === 101) {      // has not logged in
                            $location.path('/login');
                        } else {
                            console.log(response.msg);
                        }

                    });
        };

        $scope.loadListSummaryOfPage($scope.currentPage, $scope.totalRecordPerPage);

        $scope.loadPageChoose = function(currentPage, totalRecordPerPage) {

            $scope.loadListSummaryOfPage(currentPage, totalRecordPerPage);
        };
        $scope.changePageSize = function(totalRecordPerPage) {
            $scope.currentPage = 1;
            $scope.loadListSummaryOfPage($scope.currentPage, totalRecordPerPage);
        };        
    }
})();
