

var S; (function () {
    'use strict';

    angular
        .module('fb')
        .factory('UsersFactory', UsersFactory);

    UsersFactory.$inject = ['$firebaseArray', 'rootRef'];
    function UsersFactory($firebaseArray, rootRef) {

        // var _users;
        // var _first;
        var _usersRef = rootRef.child('users')

        var service = {
            getUsers: getUsers,

        };

        return service;

        ////////////////
        function getUsers() {
            // if (_users)
            //     return _users

            // _users = $firebaseArray(_usersRef)
            // S = _users;
            // return _users;
           return  $firebaseArray(_usersRef)
        }

    }
})();