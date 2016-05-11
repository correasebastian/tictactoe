

var W; (function () {
    'use strict';

    angular
        .module('fb')
        .factory('WaitingListFactory', WaitingListFactory);

    WaitingListFactory.$inject = ['$firebaseArray', 'rootRef'];
    function WaitingListFactory($firebaseArray, rootRef) {

        // var _waiting;
        // var _first;
        var _waitingRef = rootRef.child('wait').orderByChild("match").equalTo(false)

        var service = {
            getWaitingList: getWaitingList,
            // getFirst: getFirst,
            // removeFirst:removeFirst
        };

        return service;

        ////////////////
        function getWaitingList() {
            // if (_waiting)
            //     return _waiting

            // _waiting = $firebaseArray(_waitingRef)
            // W = _waiting;
            // return _waiting;
            return $firebaseArray(_waitingRef);
        }

        // function getFirst() {
        //     var key = _waiting.$keyAt(0)
        //     _first = _waiting.$getRecord(key)
        //     // _first = _waiting.$getRecord(key)            
        //     return _first;
        // }

        // function removeFirst() {
        //     return _waiting.$remove(_first)
        //         .then(onRemove)

        //     function onRemove(res) {
        //         console.info('remove ok' + res)
        //     }
        // }
    }
})();