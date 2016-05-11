

var S; (function () {
    'use strict';

    angular
        .module('fb')
        .factory('GamesFactory', GamesFactory);

    GamesFactory.$inject = ['$firebaseArray', 'rootRef'];
    function GamesFactory($firebaseArray, rootRef) {

        var _gamesRef = rootRef.child('games')

        var service = {
            getGames: getGames,

        };

        return service;

        ////////////////
        function getGames() {
            return $firebaseArray(_gamesRef)

        }

    }
})();