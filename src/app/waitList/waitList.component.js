(function () {
    'use strict';

    angular
        .module('waitListModule')
        .component('waitList', {
            templateUrl: "app/waitList/waitList.component.html",
            bindings: {
                people: "<",
                // max: "<",
                // setRating: "&"
            },
            controllerAs: "vm",
            controller: WaitListController
        })


    WaitListController.$inject = [];
    function WaitListController() {
        var vm = this;
        console.log('waitlist component', vm)


        activate();

        ////////////////

        function activate() { }
    }
})();