retailTest.controller('RetailController', ['$scope', 'ItemLoggerFactory', function($scope, ItemLoggerFactory){
  $scope.shoppingCart = Object.create(ItemLoggerFactory);
  $scope.stock = Object.create(ItemLoggerFactory);

  $scope.addProductToCart = function(items){
    addItems(items, $scope.shoppingCart);
    deleteItems(items, $scope.stock);
  }

  $scope.removeProductToCart = function(items){
    deleteItems(items, $scope.shoppingCart);
    addItems(items, $scope.stock);
  }

  function addItems(items, itemLogger){
    itemLogger.addItems(items);
  }

  function deleteItems(items, itemLogger){
    itemLogger.deleteItems(items);
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

  $scope.checkStock = function(item){
    return (item.no_stock == true) ? true : false
  }

  const RANDOM_PRICE = (Math.random()*10 + 1);
  const RANDOM_PRICE_2 = (Math.random()*10 + 1);
  var fakeItem = {'name': 'Almond Toe Court Shoes, Patent Black', 'price': RANDOM_PRICE};
  var fakeItem2 ={'name': 'Fake Name 2', 'price': RANDOM_PRICE_2};
  var outOfStockItem ={'name': 'Out of stock', 'price': 2, 'no_stock': true};
  var fakeRetailData = [fakeItem, fakeItem2, outOfStockItem];

  addItems(fakeRetailData, $scope.stock);
}]);
