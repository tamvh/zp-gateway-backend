/* global theApp */

(function () {
    'use strict';

    theApp
            .controller('LogTransactionController', LogTransactionController);

    LogTransactionController.$inject = ['$scope', 'LogTransactionService', '$rootScope', '$filter', '$location', 'LoginService', '$uibModal', '$mdDialog', '$confirm'];
    function LogTransactionController($scope, LogTransactionService, $rootScope, $filter, $location, LoginService, $uibModal, $mdDialog, $confirm) {

        if (!LoginService.isLogined()) {
            $location.path("/login");
            return;
        }
        $scope.fromDate = new Date();
        $scope.toDate = new Date();

        $scope.searchTransOption = 1;
        $scope.searchInfo = "";

        $scope.tempListPaymentStatus = [];
        $scope.tempObjPaymentStatus = {
            tranStatusID: -10,
            tranStatusName: "Tất cả"
        };
        $scope.tempListPaymentStatus.push($scope.tempObjPaymentStatus);
        $scope.initTempListPaymentStatus = function () {
            for (var i in $rootScope.tranStatus) {
                $scope.tempListPaymentStatus.push($rootScope.tranStatus[i]);
            }
        };
        $scope.initTempListPaymentStatus();
        
        $scope.paymentSttSelectedID = 1;
        $scope.totalTransPerPage = 50;
        $scope.totalTransPerPageList = [10, 30, 50, 100];
        $scope.currentPage = 1;
        $scope.maxSize = 10;
        $scope.paymentMethodSelectedID = 1;
        $scope.listSummary = [];

        $scope.loadTransOfPage = function (currentPage, totalTransPerPage) {
            var fromDate = "";
            var toDate = "";
            var paymentStatus = -10;
            
            if ($rootScope.dataFromDashboard !== null) {
                fromDate = $scope.fromDate.getFullYear() + "-" + ($scope.fromDate.getMonth() + 1) + "-" + $scope.fromDate.getDate();
                toDate = fromDate;
                $rootScope.dataFromDashboard = null;
                $("#todate").datepicker('update', $scope.toDate);
                $("#fromdate").datepicker('update', $scope.fromDate);
            } else {
                if ($scope.fromDate !== "") {
                    fromDate = $scope.fromDate.getFullYear() + "-" + ($scope.fromDate.getMonth() + 1) + "-" + $scope.fromDate.getDate();
                }
                if ($scope.toDate !== "") {
                    toDate = $scope.toDate.getFullYear() + "-" + ($scope.toDate.getMonth() + 1) + "-" + $scope.toDate.getDate();
                }
            }            

            paymentStatus = $scope.paymentSttSelectedID;

            LogTransactionService.getListTransOfPage(paymentStatus, fromDate, toDate, currentPage, totalTransPerPage)
                    .then(function (response) {
                        if (response.err === 0) {
                            $scope.currentPage = currentPage;
                            $scope.transDisplayed = response.dt.listInvoice;
                            $scope.totalTransactions = response.dt.length;

                        } else if (response.err === 101) {      // has not logged in
                            $location.path('/login');
                        } else {
                            console.log(response.msg);
                        }

                    });
            LogTransactionService.getInvoiceSummary(paymentStatus, fromDate, toDate)
                    .then(function (response) {
                        if (response.err === 0) {
                            $scope.listSummary = response.dt;
                        } else if (response.err === 101) {
                            $location.path('/login');
                        } else {
                            console.log(response.msg);
                        }
                    });
        };

        $scope.loadTransOfPage($scope.currentPage, $scope.totalTransPerPage);

        $scope.loadPageChoose = function (currentPage, totalTransPerPage) {

            var fromDate = "";
            var toDate = "";
            var paymentStatus = -10;
            if ($scope.fromDate !== "") {
                fromDate = $scope.fromDate.getFullYear() + "-" + ($scope.fromDate.getMonth() + 1) + "-" + $scope.fromDate.getDate();
            }

            if ($scope.toDate !== "")
                toDate = $scope.toDate.getFullYear() + "-" + ($scope.toDate.getMonth() + 1) + "-" + $scope.toDate.getDate();

            if ($scope.searchInfo !== "") {
                if ($scope.searchTransOption === 1) {
                    invoiceCode = $scope.searchInfo;
                }
                if ($scope.searchTransOption === 2) {
                    zpTransID = $scope.searchInfo;
                }

            }

            paymentStatus = $scope.paymentSttSelectedID;
            auditStatus = $scope.auditStatus;
            paymentMethodID = $scope.paymentMethodSelectedID;

            LogTransactionService.getListTransOfPage(paymentStatus, fromDate, toDate, currentPage, totalTransPerPage)
                    .then(function (response) {
                        if (response.err === 0) {
                            $scope.currentPage = currentPage;
                            $scope.transDisplayed = response.dt.listInvoice;
                            $scope.totalTransactions = response.dt.length;

                        } else if (response.err === 101) {      // has not logged in
                            $location.path('/login');
                        } else {
                            console.log(response.msg);
                        }

                    });
        };

        $scope.changePageSize = function (totalTransPerPage) {
            $scope.currentPage = 1;
            $scope.loadTransOfPage($scope.currentPage, totalTransPerPage);
        };
        $scope.showPaymentDate = function (index) {
            return ($scope.transactions[index].payment_date_time);

        };

        $scope.showPaymentMethod = function (index) {
            var selected = [];
            if (typeof $scope.transDisplayed[index].payment_method !== "undefined") {
                selected = $filter('filter')($rootScope.paymentMethod, {paymentMethodID: $scope.transDisplayed[index].payment_method});
            }
            return (selected.length) ? selected[0].paymentMethodName : '';
        };

        $scope.showTranStatus = function (index) {
            var selected = [];
            if (typeof $scope.transDisplayed[index].payment_status !== "undefined") {
                selected = $filter('filter')($rootScope.tranStatus, {tranStatusID: $scope.transDisplayed[index].payment_status});
            }

            return (selected.length) ? selected[0].tranStatusName : 'Thất bại';
        };

        $scope.DisplayDetail = function (transaction) {

            if (transaction.invoice_id.length <= 0) {
                return;
            }

            $scope.showAlert = function (ev) {
                $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Thông báo')
                        .textContent(ev)
                        .ariaLabel('Alert Dialog Demo')
                        .ok('OK')
                        .targetEvent(ev)
                        );
            };

            LogTransactionService.getDetailTrans(transaction.invoice_id)
                    .then(function (response) {
                        if (response.err === 0) {
                            var invoiceDetails = response.dt.invoice_details;

                            var modalInstance = $uibModal.open({
                                animation: true,
                                templateUrl: 'PopupDisplayDetailTran.html',
                                controller: 'DisplayDetailTranController',
                                size: 'gl',
                                resolve: {
                                    invoiceDetails: function () {
                                        return invoiceDetails;
                                    },
                                    invoice: function () {
                                        return transaction;
                                    }
                                }
                            });
                            modalInstance.result.then(function (result) {
                                console.log(result);
                            });
                        } else if (response.err === 101) {      // has not logged in
                            $location.path('/login');
                        } else {
                            $scope.showAlert(response.msg);
                        }
                    });
        };
    }


    theApp.controller('DisplayDetailTranController', DisplayDetailTranController);

    DisplayDetailTranController.$inject = ['$rootScope', '$scope', '$uibModalInstance', '$filter', 'invoiceDetails', 'invoice'];

    function DisplayDetailTranController($rootScope, $scope, $uibModalInstance, $filter, invoiceDetails, invoice) {
        $scope.items = invoiceDetails;
        console.log($scope.items);
        $scope.invoice = invoice;
        console.log($scope.invoice);
        $scope.close = function () {
            $uibModalInstance.close();
        };

        $scope.showTranStatus = function (paymentStatus) {
            var selected = [];
            selected = $filter('filter')($rootScope.tranStatus, {tranStatusID: paymentStatus});
            return (selected.length) ? selected[0].tranStatusName : 'Thất bại';
        };
    }
})();
