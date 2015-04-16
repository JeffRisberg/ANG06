/**
 * Application is called 'movieApp'
 */

var myApp = angular.module('movieApp', ['ngResource', 'ui.router', 'ui.bootstrap']);

angular.module('movieApp.services').factory('Entry', function ($resource) {
    return $resource('api/entries/:id', { id: '@_id'}, {
        update: {
            method: 'PUT'
        }
    }, {
        stripTrailingSlashes: false
    });
});

myApp.config(['$stateProvider', function ($stateProvider) {

    var movies = {
        name: 'movies',
        url: '/',
        templateUrl: 'template/movies.html',
        controller: 'MovieListController'
    };
    var viewMovie = {
        name: 'viewMovie',
        url: 'movies/:id/view',
        templateURL: 'templates/movie-view.html',
        controller: 'MovieViewController'
    };
    var newMovie = {
        name: 'newMovie',
        url: 'movies/new',
        templateUrl: 'templates/movie-add.html',
        controller: 'MovieCreateController'
    };
    var editMovie = {
        movie: 'editMovie',
        url: 'movies/:id/edit',
        controller: 'MovieEditController'
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

    $stateProvider.state(movies);
    $stateProvider.state(viewMovie);
    $stateProvider.state(newMovie);
    $stateProvider.state(editMovie);
    $stateProvider.state(buttons);
    $stateProvider.state(tabs);
    $stateProvider.state(accordion);
}])
    .run(['$state', function ($state) {
        $state.transitionTo('movies');
    }]);
