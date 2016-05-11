(function () {
  'use strict';

  angular
    .module('tictactoe',
    ['ngAnimate',
      // 'ngTouch',//angular material include one touch module
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ui.router',
      'ngMaterial',
      'toastr',
      'player',
      //firebase
      'fb',
      'util',
      'app.home',
      'waitListModule'    
    ]);

})();
