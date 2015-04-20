/**
 * Application is called 'gameApp'
 */

var myApp = angular.module('gameApp', ['ngResource', 'ui.router', 'ui.bootstrap', 'gameApp.controllers', 'gameApp.services']);

myApp.config(['$stateProvider', '$httpProvider', function ($stateProvider, $httpProvider) {

    var games = {
        name: 'games',
        url: '/',
        templateUrl: 'templates/games.html',
        controller: 'GameListController'
    };
    var viewGame = {
        name: 'viewGame',
        url: 'games/:id/view',
        templateUrl: 'templates/game-view.html',
        controller: 'GameViewController'
    };
    var newGame = {
        name: 'newGame',
        url: 'games/new',
        templateUrl: 'templates/game-add.html',
        controller: 'GameCreateController'
    };
    var editGame = {
        name: 'editGame',
        url: 'games/:id/edit',
        templateUrl: 'templates/game-edit.html',
        controller: 'GameEditController'
    };
    /*
    var buttons = {
        name: 'buttons',
        url: '/buttons',
        parent: games,
        templateUrl: 'templates/buttons.html'
    };
    var tabs = {
        name: 'tabs',
        url: '/tabs',
        parent: games,
        templateUrl: 'templates/tabs.html'
    };
    var accordion = {
        name: 'accordion',
        url: '/accordion',
        parent: games,
        templateUrl: 'templates/accordion.html'
    };
    */

    $stateProvider.state(games);
    $stateProvider.state(viewGame);
    $stateProvider.state(newGame);
    $stateProvider.state(editGame);

    //$stateProvider.state(buttons);
    //$stateProvider.state(tabs);
    //$stateProvider.state(accordion);
}])
    .run(['$state', function ($state) {
        $state.transitionTo('games');
    }]);
