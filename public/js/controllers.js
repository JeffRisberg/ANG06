/**
 * Created by Sandeep on 01/06/14.
 */
angular.module('movieApp.controllers', [])

    .controller('MovieListController', function ($scope, $state, popupService, $window, Movie) {
        $scope.movies = Movie.query();

        $scope.deleteMovie = function (movie) {
            if (popupService.showPopup('Really delete this?')) {
                movie.$delete(function () {
                    $window.location.href = '';
                });
            }
        }
    })

    .controller('MovieViewController', function ($scope, $stateParams, Movie) {
        $scope.movie = Movie.get({id: $stateParams.id});
    })

    .controller('MovieCreateController', function ($scope, $state, $stateParams, Movie) {
        $scope.movie = new Movie();

        $scope.addMovie = function () {
            $scope.movie.$save(function () {
                $state.go('movies');
            });
        }
    })
    .controller('MovieEditController', function ($scope, $state, $stateParams, Movie) {
        $scope.updateMovie = function () {
            $scope.movie.$update(function () {
                $state.go('movies');
            });
        };

        $scope.loadMovie = function () {
            $scope.movie = Movie.get({id: $stateParams.id});
        };

        $scope.loadMovie();
    });


myApp.controller('HomeController', ['$scope', function ($scope) {
    // nothing here right now
}]);

myApp.controller('SidebarCtrl', function ($scope, $state) {
    $scope.content = ['buttons', 'tabs', 'accordion'];

    $scope.setPage = function (page) {
        $state.transitionTo(page);
    };
});

myApp.controller('HeaderController', ['$scope', function ($scope) {
    $scope.menuItems = [
        {name: "File"},
        {name: "Edit"}
    ];
}]);

myApp.controller('ButtonsCtrl', function ($scope) {
    $scope.singleModel = 1;

    $scope.radioModel = 'Middle';

    $scope.checkModel = {
        left: false,
        middle: true,
        right: false
    };
});

myApp.controller('TabsDemoCtrl', function ($scope, $window) {
    $scope.tabs = [
        { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
        { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true }
    ];

    $scope.alertMe = function () {
        setTimeout(function () {
            $window.alert('You\'ve selected the alert tab!');
        });
    };
});

myApp.controller('AccordionDemoCtrl', function ($scope) {
    $scope.oneAtATime = true;

    $scope.groups = [
        {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        },
        {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function () {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };
});
