(function () {
  'use strict';

  angular
    .module('tictactoe')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(waitList, usersList, $timeout, webDevTec, toastr, WaitingListFactory, $mdDialog, UserService) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    // vm.waitList = [];
    vm.waitList = waitList;
    vm.usersList = usersList
    debugger
    vm.creationDate = 1462835911886;
    vm.showToastr = showToastr;
    vm.onSwipeRight = onSwipeRight;
    vm.newPlayer = newPlayer;
    vm.hideNewplayer = UserService.getUser

    activate();

    function activate() {
      getWebDevTec();
      // getWaitList()
      $timeout(function () {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function getWaitList() {
      WaitingListFactory.getWaitingList()
        .then(onGetWait)

      function onGetWait(waitList) {
        debugger
        vm.waitList = waitList
      }
    }
    function onSwipeRight(party) {
      console.info(party)
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function (awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }

    function newPlayer(ev) {

      $mdDialog.show({
        templateUrl: 'app/newplayer/new-player-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: false
      })


    }
  }
})();
