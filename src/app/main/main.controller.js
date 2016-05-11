(function () {
  'use strict';

  angular
    .module('tictactoe')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(waitList, usersList, gamesList) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    // vm.waitList = [];
    vm.waitList = waitList;
    vm.usersList = usersList
    vm.gamesList=gamesList;
    console.log(vm, 'main')
    debugger
    vm.creationDate = 1462835911886;

    activate();

    function activate() {

    }

  }
})();
