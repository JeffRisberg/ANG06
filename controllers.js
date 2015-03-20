myApp.controller('HomeController', ['$scope', function ($scope) {
    $scope.appState = "home";

    $scope.features = [
        {name: 'Talks', selected: false},
        {name: 'Listens', selected: false},
        {name: 'Ties its shoes', selected: false},
        {name: 'Goes on walks', selected: false},
        {name: 'Jumps', selected: false}
    ];

    $scope.products = [
        {name: 'Collie Dog', features: [], selected: false},
        {name: 'Chimp', features: [], selected: false},
        {name: 'Parrot', features: [], selected: false},
        {name: 'Kangaroo', features: [], selected: false}
    ];

    $scope.deleteProduct = function (product) {
        $scope.products.splice($scope.products.indexOf(product), 1);
    };

    $scope.saveProduct = function () {
        $scope.products.push({name: $scope.addName});
        $scope.addName = "";

        $scope.appState = "home";
    };
}])
