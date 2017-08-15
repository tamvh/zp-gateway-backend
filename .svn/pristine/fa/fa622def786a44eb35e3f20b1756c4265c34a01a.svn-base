(function () {
    'use strict';

    theApp
        .factory('VerifyLoginService', VerifyLoginService);

    VerifyLoginService.$inject = ['$http', '$q', 'API_URL'];
    function VerifyLoginService($http, $q, API_URL) {
        var service = {};
        var url = API_URL + "login";

        service.verify = verify;
        
        return service;
        
        function verify(data) {
            var cm = "veryfi_login";
            var dtJson = data;
            var dt = JSON.stringify(dtJson);
            var data = $.param({
                cm: cm,
                dt: dt
            });
            return $http.post(url, data).then(handleSuccess, handleError('Error verify login'));
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
