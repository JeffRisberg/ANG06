
angular.module('movieApp.services', []).factory('Movie', function ($resource) {
    return $resource('api/movies/:id', {id: '@_id'}, {
            update: {
                method: 'PUT'         }
        },
        {
            stripTrailingSlashes: false
        });
}).
    service('popupService', function ($window) {
        this.showPopup = function (message) {
            return $window.confirm(message);
        }
    });

