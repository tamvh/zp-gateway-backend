/* global theApp */
(function () {
    'use strict';
    theApp.controller('HeaderController', HeaderController);
    HeaderController.$inject = ['$rootScope', '$scope', '$http', '$cookies', '$location', 'LoginService', '$window', '$uibModal'];
    function HeaderController($rootScope, $scope, $http, $cookies, $location, LoginService, $window, $uibModal) {
        var path = $location.path();
        var titlePage = "Merchant - Admin";
        switch (path) {
            case '/dashboard/':
                titlePage = "Tổng quan";
                break;
            case '/cates/':
                titlePage = "Danh sách danh mục";
                break;
            case '/items/':
                titlePage = "Danh sách sản phẩm";
                break;
            case '/users/':
                titlePage = "Quản lý nhóm dịch vụ";
                break;
            case '/logtrans/':
                titlePage = "Nhật ký giao dịch";
                break;
            case '/login/':
                titlePage = "Quản lý nhóm dịch vụ";
                break;
            case '/audit/':
                titlePage = "Đối soát";
                break;
            case '/verify_invoice/':
                titlePage = "Kiểm tra hóa đơn";
                break;
            case '/refund/':
                titlePage = "Hoàn tiền";
                break;
            case '/staffs/':
                titlePage = "";
                break;
            case '/verify_invoice/':
                titlePage = "";
                break;
            case '/reportbymonth/':
                titlePage = "Thống kê / báo cáo theo tháng";
                break;
            case '/reportbydate/':
                titlePage = "Thống kê / báo cáo theo ngày";
                break;
            case '/reportbyitem/':
                titlePage = "Thống kê / báo cáo theo món ăn";
                break;
            case '/statistics/':
                titlePage = "Quản lý nhóm dịch vụ";
                break;
            case '/promotion/':
                titlePage = "Chương trình khuyến mãi";
                break;
            case '/logtask/':
                titlePage = "Nhật ký tác vụ";
                break;
        }

        $scope.titlePage = titlePage;

        $scope.logout = function () {
            LoginService.logout()
                    .then(function (response) {
                        if (response.err === 0) {
                            $rootScope.app_id = "";
                            $rootScope.globals.currentUser.username = "";
                            $cookies.remove('app_id');
                            $cookies.remove('u');
                            $location.url($location.path());
                            $location.path("/login");

                        } else {

                        }
                    });
        };
        $scope.reloadPage = function () {
            console.log("page items");
        };

        $scope.changePassword = function () {
            if (!LoginService.isLogined()) {
                $location.path("/login");
                return;
            }
            $location.path("/changepassword");
        };
    }    
})();