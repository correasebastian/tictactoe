
(function () {
    'use strict';

    angular.module('fb', [
        'firebase'
    ])
        .constant('FirebaseUrl', 'https://scm-tictactoe.firebaseio.com/')
        .service('rootRef', ['FirebaseUrl', Firebase]);
})();