/* global theApp */

(function () {
    'use strict';

    theApp.factory('ForgetPasswordService', ForgetPasswordService);

    ForgetPasswordService.$inject = ['$http', '$q','API_URL', '$rootScope', '$cookies', '$location'];
    function ForgetPasswordService($http, $q, API_URL, $rootScope, $cookies, $location) {
        var service = {};
        var url = API_URL + "login";
        service.forgetPassword = forgetPassword;         
        return service;
        
        function forgetPassword(email) {
            var cm = "forget_password";
            var dtJson = {email: email};
            var dt = JSON.stringify(dtJson);
            var data = $.param({
                cm: cm,
                dt: dt
            });
            return $http.post(url, data).then(handleSuccess, handleError('Error'));
        }               
        
        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { err: -2, msg: error };
            };
        }
    }
    
})();


