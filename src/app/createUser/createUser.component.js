(function () {
    'use strict';

    angular
        .module('waitListModule')
        .component('createUser', {
            templateUrl: "app/createUser/createUser.component.html",
            bindings: {
                users: "<"
            },
            controllerAs: "vm",
            controller: CreateUserController
        })


    CreateUserController.$inject = ['PartiesFactory', 'Firebase', '$state'];
    function CreateUserController(PartiesFactory, Firebase, $state) {
        var vm = this;
        vm.name = '';
        vm.parties = [];
        vm.userCreated = false;
        vm.show = false;
        vm.showForm = showForm;
        vm.createUser = createUser;
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

            function onCreatedUser(res) {
                vm.userCreated = true;
                console.info(res)
                var params={key:res.key()}
                $state.go('app.play', params)
            }

        }
    }
})();