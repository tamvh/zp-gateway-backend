(function () {
    'use strict';

    theApp
        .factory('ReportService', ReportService);

    ReportService.$inject = ['$rootScope', '$http', '$q', 'API_URL'];
    function ReportService($rootScope, $http, $q, API_URL) {
        var service = {};
        var url = API_URL + "report"; 
        
        
        service.getReportByItemOfPage = getReportByItemOfPage;
        service.getReportByDateOfPage = getReportByDateOfPage;
        service.getReportByMonthOfPage = getReportByMonthOfPage;

        // service.searchListTrans = searchListTrans
        // service.getInvoiceSummary = getInvoiceSummary; 
        
        return service;        
        
        function getReportByItemOfPage(itemName, paymentDateTimeFrom, paymentDateTimeTo, currentPage, totalTransPerPage){
            var cmd="report_by_item";
            var dtJSON = {
                            merchant_code: $rootScope.merchantCode,
                            item_name: itemName,
                            payment_date_time_from: paymentDateTimeFrom,
                            payment_date_time_to: paymentDateTimeTo,
                            current_page: currentPage,
                            total_trans_per_page: totalTransPerPage
                         };
            var dt = JSON.stringify(dtJSON);          
            var data = $.param({
                cm: cmd,
                dt: dt
            });            
            return $http.post(url, data).then(handleSuccess, handleError('Error get items of page'));

        }
        function getReportByMonthOfPage(fromMonth, toMonth, currentPage, totalRecordPerPage) {
            var cmd = "report_by_month";  
            var dtJSON = {
                            app_id: $rootScope.app_id,
                            from: fromMonth,
                            to: toMonth,
                            current_page: currentPage,
                            total_record_per_page: totalRecordPerPage
                         };
            var dt = JSON.stringify(dtJSON);          
            var data = $.param({
                cm: cmd,
                dt: dt
            });
            
            return $http.post(url, data).then(handleSuccess, handleError('Error get invoice by month'));            
        }
        function getReportByDateOfPage(fromDate, toDate, currentPage, totalRecordPerPage) {
            var cmd = "report_by_date";  
            var dtJSON = {
                            app_id: $rootScope.app_id,
                            from_date: fromDate,
                            to_date: toDate,
                            current_page: currentPage,
                            total_record_per_page: totalRecordPerPage
                         };
            var dt = JSON.stringify(dtJSON);          
            var data = $.param({
                cm: cmd,
                dt: dt
            });
            
            return $http.post(url, data).then(handleSuccess, handleError('Error get invoice by month'));            
        }
        
        function handleSuccess(res) {
            console.log('success');
            return res.data;
        }
        function handleError(error) {            
            return function () {
                
                console.log('fail');                
                return { err: -2, msg: error };
            };
        }
       
    }
    
})();
