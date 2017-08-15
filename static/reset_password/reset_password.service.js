/* global theApp */

(function () {
    'use strict';

    theApp.factory('ResetPasswordService', ResetPasswordService);

    ResetPasswordService.$inject = ['$http', '$q','API_URL', '$rootScope', '$cookies', '$location'];
    function ResetPasswordService($http, $q, API_URL, $rootScope, $cookies, $location) {
        var service = {};
        var url = API_URL + "login";
        service.resetPassword = resetPassword;         
        return service;
        
        function resetPassword(u, p) {
            var cm = "reset_password";
            var dtJson = {u: u, p: p};
            var dt = JSON.stringify(dtJson);
            var data = $.param({
                cm: cm,
                dt: dt
            });
            return $http.post(url, data).then(handleSuccess, handleError('Error login authentication'));
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


