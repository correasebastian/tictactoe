(function () {
  'use strict';

  angular
    .module('tictactoe')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/',
        abstract: true,
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        resolve: {
          'waitList': ['WaitingListFactory',
            function (WaitingListFactory) {
              return WaitingListFactory.getWaitingList().$loaded();
            }],
          'usersList': ['UsersFactory',
            function (UsersFactory) {
              return UsersFactory.getUsers().$loaded();
            }]

        }
      });

    $stateProvider
      .state('app.home', {
        url: '/home',
        views: {
          'content@app': {
            templateUrl: 'app/home/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
          }
        }
      });




    // $urlRouterProvider.otherwise('/');
    $urlRouterProvider.otherwise(function ($injector) {
      var $state = $injector.get("$state");

      $state.go('app.home');


    });
  }

})();
