(function () {
    "use strict";

    angular.module("player", [])

        .component("newPlayer", {
            templateUrl: "app/newplayer/newPlayer.component.html",
            controllerAs: "vm",
            controller: NewPlayer,
            replace: true

        });


    NewPlayer.$inject = ['rootRef', 'PartiesFactory', '$mdDialog', 'Firebase'];
    function NewPlayer(rootRef, PartiesFactory, $mdDialog, Firebase) {
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
            var user = {
                name: vm.name,
                timestamp : Firebase.ServerValue.TIMESTAMP,
                party: {
                    name: party.name,
                    src: party.src,
                    id: party.$id
                }
            }
            rootRef.child('users').push(user)
                .then(onInserted)
                .then($mdDialog.hide)

            function onInserted(res) {
                console.log(res)
                user.match = false;
                return rootRef.child('wait').child(res.key()).set(user)

            }

        }

    }
})()