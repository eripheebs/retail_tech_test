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
      var length = scope.stock.items.length;
      var item = scope.stock.items[0];
      scope.addProductToCart(item);
      expect(scope.shoppingCart.items).toContain(item);
      expect(scope.stock.items.length).toEqual(length - 1);
    });
  });

  describe('#removeProductToCart', function(){
    it('removes product to cart, puts product back in stock', function(){
      var item = scope.stock.items[0];
      scope.addProductToCart(item);
      scope.removeProductToCart(item);
      expect(scope.shoppingCart.items).not.toContain(item);
      expect(scope.shoppingCart.items.length).toEqual(0);
    });
  });

  describe('#addTotal', function(){
    it('adds up the total price of an Item Logger', function(){
      var fakeItems = [fakeItem, fakeItem];
      expect(scope.addTotal(fakeItems)).toEqual(RANDOM_PRICE + RANDOM_PRICE);
    });

    it('adds up the total price in the shopping cart', function(){
      expect(scope.addTotal(scope.shoppingCart.items)).toEqual(0);
    });
  });

  describe('checkStock', function(){
    it('checks if an item is in stock', function(){
      var outOfStockItem ={'name': 'Out of stock', 'price': 2, 'no_stock': true};
      expect(scope.checkStock(outOfStockItem)).toEqual(true);
    });
  });
});
