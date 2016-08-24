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

  describe('#addItem', function(){
    it('calls on shoppingCart methods to add item', function(){
      spyOn(ItemLoggerFactory, 'addItems')
      scope.addItems(fakeItem);
      expect(ItemLoggerFactory.addItems).toHaveBeenCalledWith(fakeItem);
    });
  });

  describe('#deleteItem', function(){
    it('calls on shoppingCart methods to delete item', function(){
      spyOn(ItemLoggerFactory, 'deleteItems')
      scope.deleteItems(fakeItem);
      expect(ItemLoggerFactory.deleteItems).toHaveBeenCalledWith(fakeItem);
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
});
