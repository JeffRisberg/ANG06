angular.module('gameApp.controllers', [])

    .controller('GameListController', function ($scope, $state, popupService, $window, Game) {
        $scope.games = Game.query();

        $scope.deleteGame = function (game) {
            if (popupService.showPopup('Really delete this?')) {
                game.$delete(function () {
                    $window.location.href = '';
                });
            }
        }
    })

    .controller('GameViewController', function ($scope, $stateParams, Game) {
        $scope.game = Game.get({id: $stateParams.id});
    })

    .controller('GameCreateController', function ($scope, $state, $stateParams, Game) {
        $scope.game = new Game();

        $scope.addGame = function () {
            $scope.game.$save(function () {
                $state.go('games');
            });
        }
    })

    .controller('GameEditController', function ($scope, $state, $stateParams, Game) {
        $scope.updateGame = function () {
            $scope.game.$update(function () {
                $state.go('games');
            });
        };

        $scope.loadGame = function () {
            $scope.game = Game.get({id: $stateParams.id});
        };

        $scope.loadGame();
    })

    .controller('EpisodeListController', function ($scope, $state, popupService, $window, Episode) {
        $scope.episodes = Episode.query();

        $scope.deleteEpisode = function (episode) {
            if (popupService.showPopup('Really delete this?')) {
                episode.$delete(function () {
                    $window.location.href = '';
                });
            }
        }
    })

    .controller('EpisodeViewController', function ($scope, $stateParams, Episode) {
        $scope.episode = Episode.get({id: $stateParams.id});
    })

    .controller('EpisodeEditController', function ($scope, $state, $stateParams, Episode) {
        $scope.updateEpisode = function () {
            $scope.episode.$update(function () {
                $state.go('episodes');
            });
        };

        $scope.loadEpisode = function () {
            $scope.episode = Episode.get({id: $stateParams.id});
        };

        $scope.loadEpisode();
    })

    .controller('EpisodeCreateController', function ($scope, $state, $stateParams, Episode) {
        $scope.episode = new Episode();

        $scope.addEpisode = function () {
            $scope.episode.$save(function () {
                $state.go('episodes');
            });
        }
    })

    .controller('HeaderController', ['$scope', '$state', function ($scope, $state) {

        $scope.stateIncludes = function (name) {
            return $state.includes(name);
        }
    }]);

myApp.controller('SidebarCtrl', function ($scope, $state) {
    $scope.content = ['buttons', 'tabs', 'accordion'];

    $scope.setPage = function (page) {
        $state.transitionTo(page);
    };
});

myApp.controller('XHeaderController', ['$scope', function ($scope) {
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
