describe('GetStockService', function(){
  beforeEach(module('retailTest'));

  var GetStockService;

  const RANDOM_PRICE = (Math.random()*10 + 1);
  const RANDOM_PRICE_2 = (Math.random()*10 + 1);
  var fakeItemData = {'name': 'Fake Name', 'category': 'Footwear', 'price': RANDOM_PRICE, 'stock': 2};
  var fakeItem2Data = {'name': 'Fake Name 2', 'category': 'Footwear', 'price': RANDOM_PRICE_2, 'stock': 1};
  var outOfStockItemData = {'name': 'Out of stock', 'category': 'Another category', 'price': RANDOM_PRICE, 'stock': 0};
  var fakeRetailData = [fakeItemData, fakeItem2Data, outOfStockItemData];

  beforeEach(inject(function(_GetStockService_, _ItemFactory_, $httpBackend){
    GetStockService = _GetStockService_;
    ItemFactory = _ItemFactory_;
    httpBackend = $httpBackend;
  }));

  it('Gets stock data from the backend', function(){
    var fakeItem = Object.create(ItemFactory);
    fakeItem.init({'name': 'Fake Name', 'category': 'Footwear', 'price': RANDOM_PRICE, 'stock': 2});
    var fakeItem2 = Object.create(ItemFactory);
    fakeItem2.init({'name': 'Fake Name 2', 'category': 'Footwear', 'price': RANDOM_PRICE_2, 'stock': 1});
    var outOfStockItem = Object.create(ItemFactory);
    outOfStockItem.init({'name': 'Out of stock', 'category': 'Another category', 'price': RANDOM_PRICE, 'stock': 0});
    var fakeRetailDataParsed = [fakeItem, fakeItem, fakeItem2, outOfStockItem];

    httpBackend.expectGET('http://localhost:3000/api/stock').respond(fakeRetailData);

    GetStockService.getStock().then(function(stock){
      expect(stock).toEqual(fakeRetailDataParsed);
    });

    httpBackend.flush();
  });
});
