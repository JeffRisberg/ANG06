/**
 * Application is called 'movieApp'
 */

var myApp = angular.module('movieApp', ['ngResource', 'ui.router', 'ui.bootstrap', 'movieApp.controllers', 'movieApp.services']);

myApp.config(['$stateProvider', function ($stateProvider) {

    var movies = {
        name: 'movies',
        url: '/',
        templateUrl: 'templates/movies.html',
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
        name: 'editMovie',
        url: 'movies/:id/edit',
        templateUrl: 'templates/movie-edit.html',
        controller: 'MovieEditController'
    };
    var buttons = {
        name: 'buttons',
        url: '/buttons',
        parent: movies,
        templateUrl: 'templates/buttons.html'
    };
    var tabs = {
        name: 'tabs',
        url: '/tabs',
        parent: movies,
        templateUrl: 'templates/tabs.html'
    };
    var accordion = {
        name: 'accordion',
        url: '/accordion',
        parent: movies,
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
