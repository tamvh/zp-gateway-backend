/* global theApp */

(function () {
    'use strict';    
    theApp.controller('ForgetPasswordController', ForgetPasswordController);
    ForgetPasswordController.$inject = ['$location', '$scope', 'ForgetPasswordService', 'LoginService', '$rootScope' ,'$window', '$routeParams', '$cookies','$mdDialog'];
    function ForgetPasswordController($location, $scope, ForgetPasswordService, LoginService, $rootScope, $window, $routeParams, $cookies, $mdDialog) {                          
        $scope.submitClicked = false;
        $scope.checkEmail = false;
        $scope.confirm = function() {
            $scope.submitClicked = true;
            var email = $scope.email;
            if(!validateEmail(email)) {
                $scope.checkEmail = true;
                return;
            } else {
                $scope.checkEmail = false;
            }     
            
            ForgetPasswordService.forgetPassword(email)
            .then(function (response) {
                if (response.err === 0) {
                    alert('Thông tin reset mật khẩu đã được gửi, vui lòng kiểm tra email.');
                }
                else if(response.err === 100) {
                    alert('Tài khoản không tồn tại trên hệ thống hoặc đã bị khóa.');
                }
                else {
                    alert('Lỗi không xác định. Vui lòng thử lại.');
                }
            });  
        };
        
        $scope.back = function() {
            $location.path('/login'); 
        };
        
        function validateEmail(email)   
        {  
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))  
            {  
                return true;
            }  
            return false;
        }
    }
})();