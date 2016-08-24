describe('retailTest', function() {
  beforeEach(function () {
    browser.get('/');
  });

  it('should show a list of stock', function() {
    var items = $$('#stockItems .item');
    expect(items.first().getText()).toContain('Product name:');
    expect(items.first().getText()).toContain('Price:');
  });

  xit('should allow you to add an item to a shopping cart', function(){
    var items = $$('#stockItems .item');
    items.first()
  });
});
