(function () {
    "use strict";

    angular.module("player", [])

        .component("newPlayer", {
            templateUrl: "app/newplayer/newPlayer.component.html",
            controllerAs: "vm",
            controller: NewPlayer,
            replace: true

        });


    NewPlayer.$inject = [];
    function NewPlayer() {
        var vm = this;


        activate();
        ////////////////

        function activate() {


        }


    }
})()