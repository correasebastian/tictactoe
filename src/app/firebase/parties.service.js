(function () {
    'use strict';

    angular
        .module('fb')
        .factory('PartiesFactory', PartiesFactory);

    PartiesFactory.$inject = ['$firebaseArray', 'rootRef'];
    function PartiesFactory($firebaseArray, rootRef) {

        var _parties;

        var service = {
            getParties: getParties
        };

        return service;

        ////////////////
        function getParties() {
            if (_parties)
                return _parties

            _parties = $firebaseArray(rootRef.child('parties')).$loaded()
            return _parties;
        }
    }
})();