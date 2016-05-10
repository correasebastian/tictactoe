(function () {
    'use strict';

    angular
        .module('util')
        .directive('scmTimeAgo', scmTimeAgo);

    scmTimeAgo.$inject = ['moment', '$interval'];

    /* @ngInject */
    function scmTimeAgo(moment, $interval) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: Controller,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {}
        };
        return directive;

        function link(scope, element, attrs, ctrl) {

            if (attrs.unixms) {
                setTimeAgoElement();
                var promiseInterval = $interval(setTimeAgoElement, 5000, 0, true);

                //cleaning
                scope.$on('$destroy', function () {
                    $interval.cancel(promiseInterval);
                });

            }

            function setTimeAgoElement() {
                element.text(ctrl.getTimeAgo(attrs.unixms));
            }

        }
    }

    /* @ngInject */
    function Controller(moment) {

        var vm = this;
        vm.test = true;

        vm.getTimeAgo = getTimeAgo

        function getTimeAgo(timestamp) {
            var nowUnixms = (moment().unix()) * 1000;
            var timeAgo = moment(parseInt(timestamp)).from(nowUnixms);
            return timeAgo;
        }

    }
})();
