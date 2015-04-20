angular.module('gameApp.services', [])

    .factory('Game', function ($resource) {
        return $resource('api/games/:id', {id: '@id'}, {
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

