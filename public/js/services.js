angular.module('gameApp.services', [])

    .factory('Game', function ($resource) {
        return $resource('api/games/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    })
    .factory('Episode', function ($resource) {
        return $resource('api/episodes/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    })
    .factory('Objective', function ($resource) {
        return $resource('api/objectives/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    })
    .service('popupService', function ($window) {
        this.showPopup = function (message) {
            return $window.confirm(message);
        }
    });

