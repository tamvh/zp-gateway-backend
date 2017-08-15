(function () {
    'use strict';

    theApp
            .factory('LogTransactionService', LogTransactionService);

    LogTransactionService.$inject = ['$rootScope', '$http', '$q', 'API_URL'];
    function LogTransactionService($rootScope, $http, $q, API_URL) {
        var service = {};
        var url = API_URL + "invoice";
        service.getListTransaction = getListTransaction;
        service.getDetailTrans = getDetailTrans;
        service.getListTransOfPage = getListTransOfPage;
        service.searchListTrans = searchListTrans;
        service.getInvoiceSummary = getInvoiceSummary;
        return service;

        function getListTransaction() {
            var cmd = "getlist";
            var dtJSON = {merchant_code: $rootScope.merchantCode};
            var dt = JSON.stringify(dtJSON);
            var data = $.param({
                cm: cmd,
                dt: dt
            });
            // This is real code
            return $http.post(url, data).then(handleSuccess, handleError('Error listing history'));
        }
        function getListTransOfPage(paymentStatus, paymentDateTimeFrom, paymentDateTimeTo, currentPage, totalTransPerPage) {
            var cmd = "pagination";
            var dtJSON = {
                app_id: $rootScope.app_id,
                payment_status: paymentStatus,
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
        function searchListTrans(invoiceCode, zpTransID, paymentStatus, paymentDateTimeFrom, paymentDateTimeTo) {
            var cmd = "search";
            var dtJSON = {
                merchant_code: $rootScope.merchantCode,
                invoice_code: invoiceCode,
                zp_trans_id: zpTransID,
                payment_status: paymentStatus,
                payment_date_time_from: paymentDateTimeFrom,
                payment_date_time_to: paymentDateTimeTo
            };
            var dt = JSON.stringify(dtJSON);
            var data = $.param({
                cm: cmd,
                dt: dt
            });
            return $http.post(url, data).then(handleSuccess, handleError('Error search trans'));
        }


        function getDetailTrans(invoiceId) {
            var cmd = "getdetail";

            var dtJSON = {merchant_code: $rootScope.merchantCode, invoice: {invoice_id: invoiceId}};
            var dt = JSON.stringify(dtJSON);
            var data = $.param({
                cm: cmd,
                dt: dt
            });
            // This is real code
            return $http.post(url, data).then(handleSuccess, handleError('Error filter'));

        }

        function getInvoiceSummary(paymentStatus, paymentDateTimeFrom, paymentDateTimeTo) {
            var cmd = "summary";
            var dtJSON = {
                app_id: $rootScope.app_id,
                payment_status: paymentStatus,
                payment_date_time_from: paymentDateTimeFrom,
                payment_date_time_to: paymentDateTimeTo
            };
            var dt = JSON.stringify(dtJSON);
            var data = $.param({
                cm: cmd,
                dt: dt
            });
            return $http.post(url, data).then(handleSuccess, handleError('Error get summary'));

        }        
        function handleSuccess(res) {
            console.log('success');
            return res.data;
        }

        function handleError(error) {
            return function () {

                console.log('fail');
                return {err: -2, msg: error};
            };
        }

    }

})();
