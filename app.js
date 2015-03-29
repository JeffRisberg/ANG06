/**
 * Application is called 'products'
 */

var myApp = angular.module('products', ['ui.router','ui.bootstrap'])
    .config(['$stateProvider', function ($stateProvider) {
        var home = {
            name: 'home',
            url: '/',
            templateUrl: 'content.html'
        };
        var buttons = {
            name: 'buttons',
            url: '/buttons',
            parent: home,
            templateUrl: 'templates/buttons.html'
        };
        var tabs = {
            name: 'tabs',
            url: '/tabs',
            parent: home,
            templateUrl: 'templates/tabs.html'
        };
        var accordion = {
            name: 'accordion',
            url: '/accordion',
            parent: home,
            templateUrl: 'templates/accordion.html'
        };

        $stateProvider.state(home);
        $stateProvider.state(buttons);
        $stateProvider.state(tabs);
        $stateProvider.state(accordion);
    }])
    .run(['$state', function ($state) {
        $state.transitionTo('home');
    }]);
