/* global theApp */

(function () {
    'use strict';

    theApp.factory('ChangePasswordService', ChangePasswordService);

    ChangePasswordService.$inject = ['$http', '$q','API_URL', '$rootScope', '$cookies', '$location'];
    function ChangePasswordService($http, $q, API_URL, $rootScope, $cookies, $location) {
        var service = {};
        var url = API_URL + "login";
        service.changePassword = changePassword;         
        return service;
        
        function changePassword(username, o_p, n_p) {
            var cm = "change_password";
            var dtJson = {u: username, o_p: o_p, n_p: n_p};
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
