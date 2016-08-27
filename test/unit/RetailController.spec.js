describe('RetailController', function(){
  beforeEach(module('retailTest'));

  var ctrl, scope, ItemLoggerFactory, VoucherFactory, GetStockService, ItemFactory, fakeItem, fakeItem2, outOfStockItem;


  beforeEach(inject(function($controller, $rootScope, _ItemLoggerFactory_, _VoucherFactory_, _GetStockService_, _ItemFactory_, $q){
    scope = $rootScope.$new;
    ctrl = $controller('RetailController', { $scope: scope });
    ItemLoggerFactory = _ItemLoggerFactory_;
    VoucherFactory = _VoucherFactory_;
    ItemFactory = _ItemFactory_;
    GetStockService = _GetStockService_;

    const RANDOM_PRICE = (Math.random()*10 + 1);
    const RANDOM_PRICE_2 = (Math.random()*10 + 1);
    fakeItem = Object.create(ItemFactory);
    fakeItem.init({'name': 'Fake Name 2', 'category': 'Footwear', 'price': RANDOM_PRICE, 'stock': 2});
    fakeItem2 = Object.create(ItemFactory);
    fakeItem2.init({'name': 'Fake Name 2', 'category': 'Footwear', 'price': RANDOM_PRICE_2, 'stock': 2});
    outOfStockItem = Object.create(ItemFactory);
    outOfStockItem.init({'name': 'Out of stock', 'category': 'Another category', 'price': RANDOM_PRICE, 'stock': 0});
    fakeRetailData = [fakeItem, fakeItem, fakeItem2, outOfStockItem];

    spyOn(GetStockService, 'getStock').and.callFake(function(){
      return {
        then: function () {
            return fakeRetailData;
        }
      };
    });

    mockFakeDataFromAPI = function(){
      fakeDataFromApi = [fakeItem, fakeItem2, outOfStockItem];
      fakeDataFromApi.forEach(function(item, index){
        scope.removeProductFromCart(item)
      });
    }

    mockFakeDataFromAPI();
  }));

  it('starts with an empty shopping cart', function(){
    expect(scope.shoppingCart.items).toEqual([]);
  });

  it('starts with stock (which is an item logger factory)', function(){
    expect(Array.isArray(scope.stock.items)).toEqual(true);
    expect(scope.stock.items.length > 1).toEqual(true);
  });

  describe('#getStockData', function(){
    it('calls on service get stock method', function(){
      scope.getStockData();
      expect(GetStockService.getStock).toHaveBeenCalled();
    });
  });

  describe('#addProductToCart', function(){
    it('adds product to cart, minuses product from stock', function(){
      var stockLength = scope.stock.items.length;
      var item = scope.stock.items[0];
      scope.addProductToCart(item);
      expect(scope.shoppingCart.items).toContain(item);
    });

    describe('When an item is out of stock', function(){
      it('throws an error when you try to add item', function(){
        var outOfStockItem = {'name': 'Out of stock', 'price': 2, 'no_stock': true};
        expect(function(){
          scope.addProductToCart(outOfStockItem)
        }).toThrow('You cannot add out of stock item');
      });
    });

    describe('When adding an item(s) makes it out of stock', function(){
      it('creates a log item that logs out of stock items in the stock', function(){
        var uniqueItem = {'name': 'Unique Item', 'price': 4};
        scope.removeProductFromCart(uniqueItem);
        var stockLength = scope.stock.items.length;
        scope.addProductToCart(uniqueItem);
        expect(scope.stock.items.length).toEqual(stockLength);
        expect(scope.stock.items[(stockLength-1)].no_stock).toEqual(true);
      });
    });
  });

  describe('#removeProductFromCart', function(){
    it('removes product from cart, puts product back in stock', function(){
      var item = scope.stock.items[0];
      scope.addProductToCart(item);
      scope.removeProductFromCart(item);
      expect(scope.shoppingCart.items).not.toContain(item);
      expect(scope.shoppingCart.items.length).toEqual(0);
    });

    it('when putting back an item which was the last one in stock, removes the no_stock log item from stock', function(){
      var uniqueItem = scope.stock.items[0];
      scope.addProductToCart(uniqueItem);
      expect(uniqueItem.no_stock).toEqual(true);
      scope.removeProductFromCart(uniqueItem);
      expect(uniqueItem.no_stock).not.toEqual(true);
      expect(scope.stock.items).toContain(uniqueItem);
    });
  });

  describe('shoppingCartTotal', function(){
    it('returns the total price of an Item Logger', function(){
      var item = scope.stock.items[0];
      scope.addProductToCart(item);
      expect(scope.shoppingCartTotal).toEqual(item.price);
    });
  });

  describe('#isCartEmpty', function(){
    it('returns true if cart is empty', function(){
      expect(scope.isCartEmpty()).toEqual(true);
      var item = scope.stock.items[0];
      scope.addProductToCart(item);
      expect(scope.isCartEmpty()).toEqual(false);
    });
  });

  describe('stockDisplay', function(){
    it('returns stock as it will be displayed to user (no repeats)', function(){
      var stockLength = scope.stock.items.length;
      scope.removeProductFromCart(fakeItem2);
      expect(scope.stock.items.length).toEqual(stockLength + 1);
      expect(scope.stockDisplay.items.length).toEqual(stockLength);
    });
  });

  describe('#addVoucher', function(){
    it('removes amount off total price', function(){
      var item = {'name': 'Unique Item', 'price': 5};
      scope.addProductToCart(item);
      scope.applyVoucher('FIVE');
      expect(scope.shoppingCartTotal).toEqual(0);
    });

    it('does not allow unapplicable vouchers e.g. TEN is only allowed when you spend over 50', function(){
      expect(function(){
        scope.applyVoucher('TEN')
      }).toThrow('That voucher is not applicable.');
    });

    it('does not allow incorrect voucher codes', function(){
      var item = {'name': 'Unique Item', 'price': 10};
      scope.addProductToCart(item);
      scope.applyVoucher('FIVE');
      expect(function(){
        scope.applyVoucher('FIVE')
      }).toThrow('You have already applied a voucher.');
    });

    it('does not allow vouchers twice', function(){
      expect(function(){
        scope.applyVoucher('WrongCode')
      }).toThrow('The voucher code is incorrect.');
    });

    xit('does not allow the voucher without footwear item', function(){

    });
  });
});
