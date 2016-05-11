

var S; (function () {
    'use strict';

    angular
        .module('fb')
        .factory('UsersFactory', UsersFactory);

    UsersFactory.$inject = ['$firebaseArray', 'rootRef'];
    function UsersFactory($firebaseArray, rootRef) {

        var _users;
        var _first;
        var _usersRef = rootRef.child('users')

        var service = {
            getUsers: getUsers,
            getFirst: getFirst,
            removeFirst:removeFirst
        };

        return service;

        ////////////////
        function getUsers() {
            if (_users)
                return _users

            _users = $firebaseArray(_usersRef)
            S = _users;
            return _users;
        }

        function getFirst() {
            var key = _users.$keyAt(0)
            _first = _users.$getRecord(key)
            // _first = _users.$getRecord(key)            
            return _first;
        }

        function removeFirst() {
            return _users.$remove(_first)
                .then(onRemove)

            function onRemove(res) {
                console.info('remove ok' + res)
            }
        }
    }
})();