(function() {
    'use strict';

    theApp
            .controller('ReportByMonthController', ReportByMonthController);

    ReportByMonthController.$inject = ['$scope', 'ReportService', '$rootScope', '$filter', '$location', 'LoginService', '$uibModal', '$mdDialog', '$confirm'];
    function ReportByMonthController($scope, ReportService, $rootScope, $filter, $location, LoginService, $uibModal, $mdDialog, $confirm) {
        if(!LoginService.isLogined()){
            $location.path("/login");
            return ;
        }
        var toDay = new Date();
        var lastYear = new Date(toDay.getFullYear() - 1, toDay.getMonth(), toDay.getDate());
        $scope.fromMonth = lastYear;
        $scope.toMonth = new Date();
        $scope.totalRecordPerPage = 50;
        $scope.totalRecordPerPageList = [10, 30, 50, 100];
        $scope.currentPage = 1;
        $scope.maxSize = 10;
        $scope.totalInvoice = 0;

        $scope.listSummary = [];
        $scope.totalRecord = 0;

        $scope.clear = function() {
            $scope.fromMonth = "";
            $scope.toMonth = "";
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            minDate: new Date(),
            startingDay: 1
        };

        $scope.openFromMonthPopup = function() {
            $scope.fromMonthPopup.opened = true;
        };
        $scope.openToMonthPopup = function() {
            $scope.toMonthPopup.opened = true;
        };

        $scope.formats = ['MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.fromMonthPopup = {
            opened: false
        };

        $scope.toMonthPopup = {
            opened: false
        };

        $scope.loadListSummaryOfPage = function(currentPage, totalRecordPerPage) {
            var fromMonth = "";
            var toMonth = "";
            var fromDate = "";
            var toDate = "";

            if ($scope.fromMonth !== "" && $scope.fromMonth !== undefined) {
                fromMonth = $scope.fromMonth.getMonth() + 1;
                fromDate = $scope.fromMonth.getFullYear() + '-' + fromMonth + "-1";
            }

            if ($scope.toMonth !== "" && $scope.toMonth !== undefined) {
                var lastDayOfMonth = new Date($scope.toMonth.getYear(), $scope.toMonth.getMonth() + 1, 0);
                toMonth = $scope.toMonth.getMonth() + 1;
                toDate = $scope.toMonth.getFullYear() + '-' + toMonth + '-' + lastDayOfMonth.getDate();
            }

            console.log("from date: " + fromDate);
            console.log("from month: " + fromMonth);
            ReportService.getReportByMonthOfPage(fromDate, toDate, currentPage, totalRecordPerPage)
                    .then(function(response) {
                        if (response.err == 0) {
                            $scope.currentPage = currentPage;
                            $scope.listSummary = response.dt.listSummary;
                            console.log(JSON.stringify(response));
                            $scope.totalRecord = response.dt.totalRecord;
                            $scope.totalRevenue = response.dt.totalRevenue;
                            $scope.totalInvoice = response.dt.totalInvoice;
                        } else if (response.err === 101) {      // has not logged in
                            $location.path('/login');
                        } else {
                            console.log(response.msg);
                        }
                    });
        }

        $scope.loadListSummaryOfPage($scope.currentPage, $scope.totalRecordPerPage);

        $scope.loadPageChoose = function(currentPage, totalRecordPerPage) {
            $scope.loadListSummaryOfPage(currentPage, totalRecordPerPage);
        };

        $scope.changePageSize = function(totalRecordPerPage) {
            $scope.currentPage = 1;
            $scope.loadListSummaryOfPage($scope.currentPage, totalRecordPerPage);
        };

        $scope.exportExcel = function() {
            var listDataToExport = [];
            if ($scope.listSummary.length > 0) {
                for (var i = 0; i < $scope.listSummary.length; i++)
                {
                    listDataToExport.push({
                        "STT": i + 1,
                        "Tháng": $scope.listSummary[i].month,
                        "Doanh thu (VNĐ)": $scope.listSummary[i].total_amount,
                        "Số lượng hóa đơn": $scope.listSummary[i].total_invoice
                    });
                }

                var today = new Date();
                var currentDate = moment(today).format('DD/MM/YYYY');
                alasql('SELECT * INTO XLSX("ReportMonthly-' + currentDate + '.xlsx",{headers:true}) FROM ?', [listDataToExport]);
            }
            else {
                alert("Không có dữ liệu");
            }

        }

    }
    ;

})();
