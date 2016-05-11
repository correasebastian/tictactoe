(function () {
    'use strict';

    angular
        .module('waitListModule')
        .component('createUser', {
            templateUrl: "app/createUser/createUser.component.html",
            bindings: {
                users: "<",
                peopleWaiting: "<",
                games: "<",
            },
            controllerAs: "vm",
            controller: CreateUserController
        })


    CreateUserController.$inject = ['PartiesFactory', 'Firebase', '$state', 'rootRef'];
    function CreateUserController(PartiesFactory, Firebase, $state, rootRef) {
        var vm = this;
        vm.name = '';
        vm.parties = [];
        vm.userCreated = false;
        vm.show = false;
        vm.showForm = showForm;
        vm.createUser = createUser;
        vm.onWaiting = false;
        var _params = {}
        console.log('createUser component', vm)


        // activate();
        vm.$onInit = activate;

        ////////////////

        function activate() {
            PartiesFactory.getParties()
                .then(onGetparties)

            function onGetparties(parties) {
                console.info(parties)
                vm.parties = parties;
            }
        }

        function showForm() {
            vm.show = true;
        }

        function createUser(party) {

            var firstPersonWaiting;
            var user = {
                name: vm.name,
                timestamp: Firebase.ServerValue.TIMESTAMP,
                party: {
                    name: party.name,
                    src: party.src,
                    id: party.$id
                }
            }
            vm.users.$add(user)
                .then(onCreatedUser)
            // .then(onInsertedWaitList)

            function onCreatedUser(res) {
                vm.userCreated = true;
                var _waitRef;
                // console.info(res);
                var key = res.key()



                // _params.key = key;




                // user.match = false;                
                // vm.peopleWaiting.$add(user)
                // // _waitRef = rootRef.child('wait').child(key);
                // // _waitRef.onDisconnect().remove();
                // // _waitRef.set(user)

                firstPersonWaiting = vm.peopleWaiting[0];
                if (!firstPersonWaiting || firstPersonWaiting.party.id === party.$id) {
                    user.match = false;
                    _waitRef = rootRef.child('wait').child(key);
                    _waitRef.onDisconnect().remove();
                    _waitRef.set(user)
                        .then(function () {
                            vm.onWaiting = true;
                            var listener = rootRef.child('games').orderByChild("user2Id").equalTo(key)
                                .once("child_added", function (childSnapshot) {
                                    console.log('add child', childSnapshot, childSnapshot.val())
                                    debugger
                                    _params.gameKey = childSnapshot.key();
                                     vm.onWaiting = false;
                                    $state.go('app.play', _params)
                                })
                        })
                }
                else {
                    // _params.counterKey = firstPersonWaiting.$id;



                    var us2 = angular.copy(firstPersonWaiting);
                    debugger
                    vm.peopleWaiting.$remove(firstPersonWaiting)
                        .then(function () {
                            var game = {
                                user1Id: key,
                                user2Id: us2.$id
                            }
                            return vm.games.$add(game)

                        })
                        .then(function (res) {
                            console.log('add game', res)
                            _params.gameKey = res.key();
                            $state.go('app.play', _params)
                        })
                }

                // $state.go('app.play', params)
            }

            function onInsertedWaitList() {
                $state.go('app.play', params)
            }

        }
    }
})();