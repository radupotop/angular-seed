/*
 A bare-bones HTTP interceptor
*/
App.factory('HttpInterceptor', function($q, $rootScope) {

    return {
        'request': function(config) {
            return config;
        },
        'response': function(response) {
            return response;
        },
        'requestError': function(reason) {
            return $q.reject(reason);
        },
        'responseError': function(reason) {
            return $q.reject(reason);
        }
    };

});
