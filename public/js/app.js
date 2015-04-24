/**
 * Application is called 'gameApp'
 */

var myApp = angular.module('gameApp', ['ngResource', 'ui.router', 'ui.bootstrap', 'gameApp.controllers', 'gameApp.services']);

myApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to games
    $urlRouterProvider.otherwise("/games/");

    var games = {
        name: 'games',
        url: '/games',
        templateUrl: 'templates/main.html',
        abstract: true
    };
    var gamesList = {
        name: 'games.list',
        url: '/',
        templateUrl: 'templates/games.html',
        controller: 'GameListController'
    };
    var gamesView = {
        name: 'games.view',
        url: '/:id/view',
        templateUrl: 'templates/game-view.html',
        controller: 'GameViewController'
    };
    var gamesNew = {
        name: 'games.new',
        url: '/new',
        templateUrl: 'templates/game-add.html',
        controller: 'GameCreateController'
    };
    var gamesEdit = {
        name: 'games.edit',
        url: '/:id/edit',
        templateUrl: 'templates/game-edit.html',
        controller: 'GameEditController'
    };

    var episodes = {
        name: 'episodes',
        url: '/episodes',
        templateUrl: 'templates/main.html',
        abstract: true
    };
    var episodesList = {
        name: 'episodes.list',
        url: '/',
        templateUrl: 'templates/episodes.html',
        controller: 'EpisodeListController'
    };
    var episodesView = {
        name: 'episodes.view',
        url: '/:id/view',
        templateUrl: 'templates/episode-view.html',
        controller: 'EpisodeViewController'
    };
    var episodesNew = {
        name: 'episodes.new',
        url: '/new',
        templateUrl: 'templates/episode-add.html',
        controller: 'EpisodeCreateController'
    };
    var episodesEdit = {
        name: 'episodes.edit',
        url: '/:id/edit',
        templateUrl: 'templates/episode-edit.html',
        controller: 'EpisodeEditController'
    };

    var objectives = {
        name: 'objectives',
        url: '/objectives',
        templateUrl: 'templates/main.html',
        abstract: true
    };
    var objectivesList = {
        name: 'objectives.list',
        url: '/',
        templateUrl: 'templates/objectives.html',
        controller: 'ObjectiveListController'
    };
    var objectivesView = {
        name: 'objectives.view',
        url: '/:id/view',
        templateUrl: 'templates/objective-view.html',
        controller: 'ObjectiveViewController'
    };

    var editFilters = {
        name: 'editFilters',
        url: '/editFilters',
        templateUrl: 'templates/editFilters.html'
    };
    var editColumns = {
        name: 'editColumns',
        url: '/edtColumns',
        templateUrl: 'templates/editColumns.html'
    };

    var buttons = {
        name: 'buttons',
        url: '/buttons',
        templateUrl: 'templates/buttons.html'
    };
    var tabs = {
        name: 'tabs',
        url: '/tabs',
        templateUrl: 'templates/tabs.html'
    };
    var accordions = {
        name: 'accordions',
        url: '/accordions',
        templateUrl: 'templates/accordions.html'
    };

    $stateProvider.state(games);
    $stateProvider.state(gamesList);
    $stateProvider.state(gamesView);
    $stateProvider.state(gamesNew);
    $stateProvider.state(gamesEdit);

    $stateProvider.state(episodes);
    $stateProvider.state(episodesList);
    $stateProvider.state(episodesView);
    $stateProvider.state(episodesNew);
    $stateProvider.state(episodesEdit);

    $stateProvider.state(objectives);
    $stateProvider.state(objectivesList);
    $stateProvider.state(objectivesView);

    $stateProvider.state(editFilters);
    $stateProvider.state(editColumns);

    $stateProvider.state(buttons);
    $stateProvider.state(tabs);
    $stateProvider.state(accordions);
}]);
