retailTest.controller('RetailController', ['$scope', 'ItemLoggerFactory', 'VoucherFactory', function($scope, ItemLoggerFactory, VoucherFactory){
  $scope.shoppingCart = Object.create(ItemLoggerFactory);
  $scope.stock = Object.create(ItemLoggerFactory);
  $scope.stockDisplay = Object.create(ItemLoggerFactory);
  $scope.shoppingCartTotal = 0;
  $scope.discount = 0;

  var fiverVoucher = Object.create(VoucherFactory);
  fiverVoucher.init({'code': 'FIVE', 'discount': 5, 'minimumSpend': 5});
  var tennerVoucher = Object.create(VoucherFactory);
  tennerVoucher.init({'code': 'TEN', 'discount': 10, 'minimumSpend': 50});
  var fifteenVoucher = Object.create(VoucherFactory);
  fifteenVoucher.init({'code': 'FIFTEEN', 'discount': 15, 'minimumSpend': 75, 'conditionalItem': 'Footwear'});
  const vouchers = [fiverVoucher, tennerVoucher, fifteenVoucher];

  $scope.isCartEmpty = function(){
    return ($scope.shoppingCart.items.length < 1) ? true : false
  }

  $scope.addProductToCart = function(items){
    checkStock(items);
    addItems(items, $scope.shoppingCart);
    checkLastItem(items);
    deleteItems(items, $scope.stock);
    updateTotalPrice($scope.shoppingCart.items);
    updateStockDisplay();
  }

  $scope.removeProductFromCart = function(items){
    deleteItems(items, $scope.shoppingCart);
    removeOutOfStockLogItems(items);
    addItems(items, $scope.stock);
    updateTotalPrice($scope.shoppingCart.items);
    updateStockDisplay();
  }

  $scope.applyVoucher = function(voucherCode){
    var voucher = findVoucher(voucherCode);
    if (notApplicable(voucher)){
      throw 'That voucher is not applicable.';
    } else {
      applyDiscount(voucher);
    }

    function applyDiscount(voucher){
      $scope.discount = voucher.discount;
      $scope.shoppingCartTotal = $scope.shoppingCartTotal - $scope.discount;
    }

    function notApplicable(voucher){
      if ($scope.shoppingCartTotal < voucher.minimumSpend){
        return true;
      }
    }

    function findVoucher(voucherCode){
      var voucher;
      for (var i = 0; i < vouchers.length; i++){
        if (vouchers[i].code == voucherCode) { voucher = vouchers[i] }
      }
      if (!voucher){
        throw 'The voucher code is incorrect.';
      }
      return voucher;
    }
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

    function noStock(item){
      return (item.no_stock == true) ? true : false
    }
  }

  function addItems(items, itemLogger){
    itemLogger.addItems(items);
  }

  function deleteItems(items, itemLogger){
    itemLogger.deleteItems(items);
  }

  function checkLastItem(items){
    var checkTheseItems = [].concat.apply([], arguments);
    checkTheseItems.forEach(function(item){
      if (islastItem(item, $scope.stock.items)) { logOutOfStockItem(item) }
    });

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
  }

  function removeOutOfStockLogItems(items){
    var removeTheseItems = [].concat.apply([], arguments);
    removeTheseItems.forEach(function(item){
      item['no_stock'] = true;
      deleteItems(item, $scope.stock);
      item['no_stock'] = false;
    });
  }

  function updateStockDisplay(){
    $scope.stockDisplay.items = $scope.stock.items.filter(function(item, i, self) {
      return self.indexOf(item) == i;
    });
  }

  const RANDOM_PRICE = (Math.random()*10 + 1);
  const RANDOM_PRICE_2 = (Math.random()*10 + 1);
  var fakeItem = {'name': 'Almond Toe Court Shoes, Patent Black', 'price': RANDOM_PRICE};
  var fakeItem2 = {'name': 'Fake Name 2', 'price': RANDOM_PRICE_2};
  var outOfStockItem = {'name': 'Out of stock', 'price': 2, 'no_stock': true};
  var fakeRetailData = [fakeItem, fakeItem2, fakeItem2, outOfStockItem];

  addItems(fakeRetailData, $scope.stock);
  updateStockDisplay();
}]);
