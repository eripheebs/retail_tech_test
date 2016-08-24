retailTest.controller('RetailController', ['$scope', 'ItemLoggerFactory', function($scope, ItemLoggerFactory){
  $scope.shoppingCart = Object.create(ItemLoggerFactory);
  $scope.stock = Object.create(ItemLoggerFactory);
  $scope.shoppingCartTotal = 0;

  $scope.isCartEmpty = function(){
    return ($scope.shoppingCart.items.length < 1) ? true : false
  }

  $scope.addProductToCart = function(items){
    checkStock(items);
    addItems(items, $scope.shoppingCart);
    checkLastItem(items);
    deleteItems(items, $scope.stock);
    updateTotalPrice($scope.shoppingCart.items);
  }

  $scope.removeProductFromCart = function(items){
    deleteItems(items, $scope.shoppingCart);
    removeOutOfStockLogItems(items);
    addItems(items, $scope.stock);
    updateTotalPrice($scope.shoppingCart.items);
  }

  function updateTotalPrice(itemsArray){
    return (itemsArray.length < 1) ? 0 : addPrices(itemsArray);

    function addPrices(itemsArray){
      var total = 0;
      itemsArray.forEach(function(item){
        total += item.price
      });
      $scope.shoppingCartTotal = total;
    }
  }

  function checkStock(items){
    var checkTheseItems = [].concat.apply([], arguments);
    checkTheseItems.forEach(function(item){
      if (noStock(item)) { throw 'You cannot add out of stock item' };
    });
  }

  function addItems(items, itemLogger){
    itemLogger.addItems(items);
  }

  function deleteItems(items, itemLogger){
    itemLogger.deleteItems(items);
  }

  function noStock(item){
    return (item.no_stock == true) ? true : false
  }

  function checkLastItem(items){
    var checkTheseItems = [].concat.apply([], arguments);
    checkTheseItems.forEach(function(item){
      if (islastItem(item, $scope.stock.items)) { logOutOfStockItem(item) }
    });
  }

  function islastItem(item, stock){
    var itemCount = 0;
    for (var i = 0; i < stock.length; i++){
      if (item == stock[i]) { itemCount += 1 }
    }
    return !!(itemCount == 1);
  }

  function logOutOfStockItem(item){
    item['no_stock'] = true;
    addItems(item, $scope.stock);
  }

  function removeOutOfStockLogItems(items){
    var removeTheseItems = [].concat.apply([], arguments);
    removeTheseItems.forEach(function(item){
      item['no_stock'] = true;
      deleteItems(item, $scope.stock);
      item['no_stock'] = false;
    });
  }

  const RANDOM_PRICE = (Math.random()*10 + 1);
  const RANDOM_PRICE_2 = (Math.random()*10 + 1);
  var fakeItem = {'name': 'Almond Toe Court Shoes, Patent Black', 'price': RANDOM_PRICE};
  var fakeItem2 = {'name': 'Fake Name 2', 'price': RANDOM_PRICE_2};
  var outOfStockItem = {'name': 'Out of stock', 'price': 2, 'no_stock': true};
  var fakeRetailData = [fakeItem, fakeItem2, outOfStockItem];

  addItems(fakeRetailData, $scope.stock);
}]);
