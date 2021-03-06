(function () {
    'use strict';

    theApp
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$http', '$q','API_URL', '$rootScope', '$cookies', '$location'];
    function LoginService($http, $q, API_URL, $rootScope, $cookies, $location) {
        var service = {};
        var url = API_URL + "login";
        service.login = login; 
        service.verify = verify;
        service.logout = logout;
        service.isLogined = isLogined;
        service.changePassword = changePassword;
        return service;
        
        function login(username, password) {
            var cm = "login";
            var dtJson = {u: username, p: password};
            var dt = JSON.stringify(dtJson);
            var data = $.param({
                cm: cm,
                dt: dt
            });
            // This is real code
            return $http.post(url, data).then(handleSuccess, handleError('Error login authentication'));
        }
        
        function changePassword(username, o_p, n_p) {
            var cm = "change_password";
            var dtJson = {u: username, o_p: o_p, n_p: n_p};
            var dt = JSON.stringify(dtJson);
            var data = $.param({
                cm: cm,
                dt: dt
            });
            // This is real code
            return $http.post(url, data).then(handleSuccess, handleError('Error login authentication'));
        }
        
        function verify(data) {
            var cm = "verify";
            var dtJson = data;           
            var dt = JSON.stringify(dtJson);
            var data = $.param({
                cm: cm,
                dt: dt
            });
            return $http.post(url, data).then(handleSuccess, handleError('Error verify login'));
        }
        
        
        function logout(){             
            var cm = "logout";
            var dtJson = "";
            var dt = JSON.stringify(dtJson);
            var data = $.param({
                cm: cm,
                dt: dt
            });
            return $http.post(url, data).then(handleSuccess, handleError('Error logout'));
        }
        
        
        function isLogined(){
            $rootScope.app_id = $cookies.get('app_id');
            
            if ($rootScope.app_id === undefined) {
                $rootScope.app_id = "";
            }
            
            $rootScope.globals.currentUser.username = $cookies.get('u');
            if ($rootScope.globals.currentUser.username === undefined) {
                $rootScope.globals.currentUser.username = "";
            }
            
            if ($rootScope.app_id === "" || $rootScope.globals.currentUser.username === "") {   
                return false;            
            }
            
            return true; 
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
