describe('ItemLoggerFactory', function() {
  beforeEach(module('retailTest'));

  var ItemLoggerFactory;

  const RANDOM_PRICE = (Math.random()*10 + 1);
  const RANDOM_PRICE_2 = (Math.random()*10 + 1);
  var fakeItem = {"name": "Fake Name", "price": RANDOM_PRICE};
  var fakeItem2 ={"name": "Fake Name 2", "price": RANDOM_PRICE_2};
  var fakeRetailData = [fakeItem, fakeItem2];

  beforeEach(inject(function(_ItemLoggerFactory_) {
    ItemLoggerFactory = _ItemLoggerFactory_;
  }));

  it('initialises with an array', function() {
    expect(ItemLoggerFactory.items).toEqual([]);
  });

  it('can add item', function(){
    ItemLoggerFactory.addItem(fakeItem);
    expect(ItemLoggerFactory.items).toEqual([fakeItem]);
  });
});
