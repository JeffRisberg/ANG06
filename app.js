/**
 * Application is called 'products'
 */

var myApp = angular.module('products', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        var home = {
            name: 'home',
            url: '/',
            templateUrl: 'content.html'
        };
        var red = {
            name: 'red',
            url: '/red',
            parent: home,
            templateUrl: 'content.red.html'
        };
        var blue = {
            name: 'blue',
            url: '/blue',
            parent: home,
            templateUrl: 'content.blue.html'
        };
        var green = {
            name: 'green',
            url: '/green',
            parent: home,
            templateUrl: 'content.green.html'
        };

        $stateProvider.state(home);
        $stateProvider.state(red);
        $stateProvider.state(green);
        $stateProvider.state(blue);
    }])
    .run(['$state', function ($state) {
        $state.transitionTo('home');
    }])

    .controller('SidebarCtrl', function ($scope, $state) {

        $scope.content = ['red', 'green', 'blue'];

        $scope.setPage = function (page) {
            $state.transitionTo(page);
        };
    });