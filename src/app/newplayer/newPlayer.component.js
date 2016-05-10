(function () {
    "use strict";

    angular.module("player", [])

        .component("newPlayer", {
            templateUrl: "app/newplayer/newPlayer.component.html",
            controllerAs: "vm",
            controller: NewPlayer,
            replace: true

        });


    NewPlayer.$inject = ['rootRef', 'PartiesFactory'];
    function NewPlayer(rootRef, PartiesFactory) {
        var vm = this;
        vm.name = '';
        vm.createUser = createUser;


        activate();
        ////////////////

        function activate() {
            PartiesFactory.getParties()
                .then(onGetparties)

            function onGetparties(parties) {
                console.info(parties)
                vm.parties = parties;
            }


        }

        function createUser(party) {
            rootRef.child('users').push({ name: vm.name, party: party })
        }

    }
})()