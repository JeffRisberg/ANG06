myApp.controller('HomeController', ['$scope', function ($scope) {
    $scope.appState = "home";

    $scope.products = [
        {name: 'Laptop', features: [], selected: false},
        {name: 'Desktop', features: [], selected: false},
        {name: 'Monitor', features: [], selected: false},
        {name: 'Flash drive', features: [], selected: false}
    ];
}]);

myApp.controller('SidebarCtrl', function ($scope, $state) {

    $scope.content = ['red', 'green', 'blue'];

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
