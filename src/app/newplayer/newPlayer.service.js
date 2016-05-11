(function () {
    'use strict';

    angular
        .module('player')
        .factory('UserService', UserService);

    UserService.$inject = [];
    function UserService() {
        var _registered = false;
        var service = {
            getUser: getUser,
            setUser: setUser
        };

        return service;

        ////////////////
        function getUser() {
            return _registered
        }

        function setUser() {
            _registered = true;
        }
    }
})();