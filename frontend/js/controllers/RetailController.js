retailTest.controller('RetailController', ['$scope', 'ItemLoggerFactory', function($scope, ItemLoggerFactory){
  $scope.shoppingCart = Object.create(ItemLoggerFactory);
}]);
