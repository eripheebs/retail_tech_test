describe('ItemLoggerFactory', function() {
  beforeEach(module('retailTest'));

  var ItemLoggerFactory;

  const RANDOM_PRICE = (Math.random()*10 + 1);
  const RANDOM_PRICE_2 = (Math.random()*10 + 1);
  var fakeItem = {'name': 'Fake Name', 'price': RANDOM_PRICE};
  var fakeItem2 ={'name': 'Fake Name 2', 'price': RANDOM_PRICE_2};
  var fakeRetailData = [fakeItem, fakeItem2];

  beforeEach(inject(function(_ItemLoggerFactory_) {
    ItemLoggerFactory = _ItemLoggerFactory_;
  }));

  it('initialises with an array', function() {
    expect(ItemLoggerFactory.items).toEqual([]);
  });

  describe('#addItem', function(){
    it('can add item', function(){
      ItemLoggerFactory.addItems(fakeItem);
      expect(ItemLoggerFactory.items).toEqual([fakeItem]);
    });

    it('can add item(s) as list of arguments', function(){
      ItemLoggerFactory.addItems(fakeItem, fakeItem2);
      expect(ItemLoggerFactory.items).toEqual(fakeRetailData);
    });

    it('can add item(s) as array', function(){
      ItemLoggerFactory.addItems(fakeRetailData);
      expect(ItemLoggerFactory.items).toEqual(fakeRetailData);
    });
  });

  describe('#deleteItem', function(){
    it('can delete item', function(){
      ItemLoggerFactory.addItems(fakeItem);
      ItemLoggerFactory.deleteItems(fakeItem);
      expect(ItemLoggerFactory.items).toEqual([]);
    });

    it('can delete item(s) both as array and passed as list of arguments', function(){
      ItemLoggerFactory.addItems(fakeRetailData);
      ItemLoggerFactory.deleteItems(fakeRetailData);
      ItemLoggerFactory.addItems(fakeRetailData);
      ItemLoggerFactory.deleteItems(fakeItem, fakeItem2);
      expect(ItemLoggerFactory.items).toEqual([]);
    });
  });
});
