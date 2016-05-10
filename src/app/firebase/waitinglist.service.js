(function () {
    'use strict';

    angular
        .module('fb')
        .factory('WaitingListFactory', WaitingListFactory);

    WaitingListFactory.$inject = ['$firebaseArray', 'rootRef'];
    function WaitingListFactory($firebaseArray, rootRef) {

        var _waiting;
        var _waitingRef = rootRef.child('wait').orderByChild("match").equalTo(false)

        var service = {
            getWaitingList: getWaitingList
        };

        return service;

        ////////////////
        function getWaitingList() {
            if (_waiting)
                return _waiting

            _waiting = $firebaseArray(_waitingRef).$loaded()
            return _waiting;
        }
    }
})();