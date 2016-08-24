describe('RetailController', function(){
  beforeEach(module('retailTest'));

  var ctrl, scope, ItemLoggerFactory;

  beforeEach(inject(function($controller, $rootScope, _ItemLoggerFactory_){
    scope = $rootScope.$new;
    ctrl = $controller('RetailController', { $scope: scope });
    ItemLoggerFactory = _ItemLoggerFactory_;
  }));

  it('starts with an empty shopping cart', function(){
    expect(scope.shoppingCart.items).toEqual([]);
  });
});
