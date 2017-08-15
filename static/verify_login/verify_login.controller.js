(function () {
    'use strict';
    
    theApp
        .controller('VerifyLoginController', VerifyLoginController);

    VerifyLoginController.$inject = ['$location', 'VerifyLoginService','$routeParams','$rootScope','$mdDialog'];
    function VerifyLoginController($location, VerifyLoginService,$routeParams,$rootScope,$mdDialog) {
	var vm = this;
        
        var sid = $routeParams.sid;
        var mess = $routeParams.mess;
        var u = $routeParams.u;
        var dataVerify = $routeParams;
       VerifyLoginService.verify(dataVerify)
            .then(function (response) {
                if (response.err === 0 && response.dt.verifyResult === "succ") {
                        $location.path('/dashboard'); 
                }
                else
                {
                    $scope.showAlert("Vui lòng kiểm tra lại tài khoản/password");
                      //alert("Vui lòng kiểm tra lại tài khoản/password");
                      $location.path('/logins'); 
                }
                
            });
       
         $scope.showAlert = function(ev) {  
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
    }

})();