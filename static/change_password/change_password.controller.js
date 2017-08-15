/* global theApp */

(function () {
    'use strict';    
    theApp.controller('ChangePasswordController', ChangePasswordController);
    ChangePasswordController.$inject = ['$location', '$scope', 'ChangePasswordService', 'LoginService', '$rootScope' ,'$window', '$routeParams', '$cookies','$mdDialog'];
    function ChangePasswordController($location, $scope, ChangePasswordService, LoginService, $rootScope, $window, $routeParams, $cookies, $mdDialog) {                          
        $scope.submitClicked = false;
        $scope.isCheckPass = false;
        $scope.isCheckConfirmPass = false;
        angular.element("#focusElement").focus();
        $scope.u = $rootScope.globals.currentUser.username;
        
        $scope.save = function() {
            $scope.submitClicked = true;
            var username = $scope.u;
            var o_pass = $scope.o_pass;
            var n_pass = $scope.n_pass;
            var confirm_n_pass = $scope.confirm_n_pass;
            if(confirm_n_pass !== n_pass) {
                $scope.isCheckConfirmPass = true;
                return;
            }
            
            ChangePasswordService.changePassword(username, o_pass, n_pass)
                    .then(function (response) {
                        if (response.err === 0) {
                            //Thay đổi mật khẩu thành công. 
                            console.log("========= clear cookies");                            
                            clearCoookies();
                            LoginService.login(username, n_pass)
                            .then(function (response) {
                                if (response.err === 0) {
                                    $rootScope.globals.currentUser.username = response.dt.account_name;  
                                    $rootScope.app_id = response.dt.app_id;
                                    $rootScope.app_user = response.dt.app_user;
                                    $rootScope.reset = response.dt.reset;
                                    $cookies.put('u', $rootScope.globals.currentUser.username);
                                    if(parseInt(response.dt.reset) === 1) {
                                        $location.path('/changepassword'); 
                                    } else {
                                        $cookies.put('app_id', $rootScope.app_id);
                                        $cookies.put('app_user', $rootScope.app_user);
                                        $location.url($location.path());
                                        $location.path('/dashboard'); 
                                    }
                                }else{
                                    $location.url($location.path());
                                    $scope.showAlert(response.msg);
                                    $location.path('/login');
                                }
                            });
                        } else if (response.err === 104) {
                            //Mật khẩu không đúng
                            $scope.isCheckPass = true;
                        }
                    });
        };
        function clearCoookies (){
            $rootScope.app_id = "";            
            $rootScope.globals.currentUser.username = "";
            $cookies.remove('app_id');
            $cookies.remove('u'); 
        }  
    }
})();