(function () {
    'use strict';

    theApp
        .factory('DashboardService', DashboardService);

    DashboardService.$inject = ['$rootScope', '$http', '$q', 'API_URL'];
    function DashboardService($rootScope, $http, $q, API_URL) {
        var service = {};
        var url = API_URL + "dashboard"; 
        
        service.getSummary = getSummary;
        return service;

        function getSummary(date){
            var cmd = "summary";
            var dtJSON = {
                payment_status: 1,
                app_id: $rootScope.app_id,
                today: date                
            };
            var dt = JSON.stringify(dtJSON);
            var data = $.param({
                cm: cmd,
                dt: dt
            });            
            return $http.post(url, data).then(handleSuccess, handleError('Error get summary in dashboard'));

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
