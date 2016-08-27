describe('ItemFactory', function() {
  beforeEach(module('retailTest'));

  var ItemFactory;

  beforeEach(inject(function(_ItemFactory_) {
    ItemFactory = _ItemFactory_;
    item = Object.create(ItemFactory);
  }));

  it('can be initialized to return price, name etc', function() {
    const RANDOM_PRICE = (Math.random()*10 + 1);
    item.init({'name': 'Fake name', 'price': RANDOM_PRICE})
    expect(item.name).toEqual('Fake name');
    expect(item.price).toEqual(RANDOM_PRICE);
  });

  it('returns No stock value true if quantity of stock is 0', function() {
    const RANDOM_PRICE = (Math.random()*10 + 1);
    item.init({'name': 'Fake name', 'price': RANDOM_PRICE, 'stock': 0})
    expect(item.no_stock).toEqual(true);
  });
});
