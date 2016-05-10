
(function () {
    'use strict';

    angular.module('fb', [
        'firebase'
    ])
        .constant('Firebase', Firebase)
        .constant('FirebaseUrl', 'https://scm-tictactoe.firebaseio.com/')
        .service('rootRef', ['FirebaseUrl', Firebase]);
})();