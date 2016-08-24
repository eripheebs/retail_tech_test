describe('RetailController', function(){
  beforeEach(module('retailTest'));

  var ctrl, scope, ItemLoggerFactory;
  const RANDOM_PRICE = (Math.random()*10 + 1);
  var fakeItem = {'name': 'Fake Name', 'price': RANDOM_PRICE};

  beforeEach(inject(function($controller, $rootScope, _ItemLoggerFactory_){
    scope = $rootScope.$new;
    ctrl = $controller('RetailController', { $scope: scope });
    ItemLoggerFactory = _ItemLoggerFactory_;
  }));

  it('starts with an empty shopping cart', function(){
    expect(scope.shoppingCart.items).toEqual([]);
  });

  it('starts with stock (which is an item logger factory)', function(){
    expect(Array.isArray(scope.stock.items)).toEqual(true);
    expect(scope.stock.items.length > 1).toEqual(true);
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
    })
  })
});
