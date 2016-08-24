retailTest.controller('RetailController', ['$scope', 'ItemLoggerFactory', function($scope, ItemLoggerFactory){
  $scope.shoppingCart = Object.create(ItemLoggerFactory);

  $scope.addItems = function(items){
    $scope.shoppingCart.addItems(items);
  }

  $scope.deleteItems = function(items){
    $scope.shoppingCart.deleteItems(items);
  }

  $scope.addTotal = function(itemsArray){
    return (itemsArray.length < 1) ? 0 : addPrices(itemsArray);

    function addPrices(itemsArray){
      var total = 0;
      itemsArray.forEach(function(item){
        total += item.price
      });
      return total;
    }
  }
}]);
