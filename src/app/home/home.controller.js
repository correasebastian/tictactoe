(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['waitList'];
    function HomeController(waitList) {
        var vm = this;
        vm.title = 'home view'
        vm.waitList = waitList;
        debugger;
        activate();

        ////////////////

        function activate() { }
    }
})();