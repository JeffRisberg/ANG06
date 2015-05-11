/**
 * Application is called 'gameApp'
 */

var myApp = angular.module('gameApp', ['ngResource', 'ui.router', 'ui.bootstrap', 'ui.select', 'wj', 'gameApp.controllers', 'gameApp.services']);

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
    var selects = {
        name: 'selects',
        url: '/selects',
        templateUrl: 'templates/selects.html'
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
    $stateProvider.state(selects);
}]);

myApp.directive('ang06Grid', [function () {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            itemsSource: '=',
            columnLayout: '=',
            itemFormatter: '=',
            selectionMode: '@',
            headersVisibility: '@'
        },
        template: '<div/>',

        link: function (scope, element, attrs) {

            // create flexgrid
            var flex = new wijmo.grid.FlexGrid(element[0]);

            flex.rows.defaultSize = 45; // pixels
            //grid apply column layout
            if (scope.columnLayout) {
                var cols = scope.columnLayout;
                flex.autoGenerateColumns = false;
                for (var i = 0; i < cols.length; i++) {
                    flex.columns.push(new wijmo.grid.Column(cols[i]));
                }
            }

            // apply itemSource
            if (scope.itemsSource) {
                flex.itemsSource = scope.itemsSource;
            }

            if (scope.selectionMode) {
                flex.selectionMode = scope.selectionMode;
            }

            if (scope.headersVisibility) {
                flex.headersVisibility = scope.headersVisibility;
            }

            if (scope.itemFormatter) {
                flex.itemFormatter = scope.itemFormatter;
            }
        }
    }
}]);

myApp.filter('propsFilter', function() {
    return function(items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items.forEach(function(item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    }
});

