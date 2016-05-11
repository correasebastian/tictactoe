(function () {
    "use strict";

    angular.module("player", [])

        .component("newPlayer", {
            templateUrl: "app/newplayer/newPlayer.component.html",
            controllerAs: "vm",
            controller: NewPlayer,
            replace: true

        });


    NewPlayer.$inject = ['rootRef', 'PartiesFactory', '$mdDialog', 'Firebase', 'WaitingListFactory', 'UserService'];
    function NewPlayer(rootRef, PartiesFactory, $mdDialog, Firebase, WaitingListFactory, UserService) {
        var vm = this;
        debugger
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
                timestamp: Firebase.ServerValue.TIMESTAMP,
                party: {
                    name: party.name,
                    src: party.src,
                    id: party.$id
                }
            }
            rootRef.child('users').push(user)
                .then(onInserted)
            // .finally($mdDialog.hide)
            // .then(onInsertWaitList)

            function onInserted(res) {
                debugger
                var insertedKey = res.key();
                var _waitRef;
                UserService.setUser();
                var first = WaitingListFactory.getFirst()
                if (!first || first.party.id === party.$id) {
                    console.log(res)
                    user.match = false;
                    _waitRef = rootRef.child('wait').child(res.key())

                    _waitRef.onDisconnect().remove();
                    _waitRef.set(user);

                } else {

                    WaitingListFactory.removeFirst();


                    // Generate a new push ID for the new post
                    var newGameRef = rootRef.child("games").push();
                    var newGameKey = newGameRef.key();

                    // Create the data we want to update
                    var updatedUserData = {};
                    updatedUserData['users/' + first.$id + '/activeGame'] = newGameKey;
                    updatedUserData['users/' + insertedKey + '/activeGame'] = newGameKey;
                    updatedUserData['games/' + newGameKey ] = {user1:{name:first.name}, user2: {name:user.name}};

                    // Do a deep-path update
                    rootRef.update(updatedUserData, function (error) {
                        if (error) {
                            console.log("Error updating data:", error);
                        }
                    });
                }

                $mdDialog.hide()
                // $mdDialog.hide()

            }

            function onInsertWaitList() {
                console.log(_waitRef)
                debugger
                _waitRef.onDisconnect().remove();

            }



        }

    }
})()