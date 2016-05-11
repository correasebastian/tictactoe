(function() {
'use strict';

    angular
        .module('app.play')
        .controller('PlayController', PlayController);

    PlayController.$inject = ['$stateParams'];
    function PlayController($stateParams) {
        var vm = this;
        console.log($stateParams, 'stateparams')
        

        activate();

        ////////////////

        function activate() { }
    }
})();