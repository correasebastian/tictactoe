(function () {
  'use strict';

  angular
    .module('tictactoe')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        resolve:
        {
          waitList: ['WaitingListFactory',
            function (WaitingListFactory) {
              return WaitingListFactory.getWaitingList().$loaded();
            }]
        }
      });

    // $urlRouterProvider.otherwise('/');
    $urlRouterProvider.otherwise(function ($injector) {
      var $state = $injector.get("$state");

      $state.go('home');


    });
  }

})();
