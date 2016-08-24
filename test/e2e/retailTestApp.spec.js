describe('retailTest', function() {
  beforeEach(function () {
    browser.get('/');
  });

  it('should show a list of stock', function() {
    var stockItems = $$('#stockItems .item');
    expect(stockItems.first().getText()).toContain('Product name:');
    expect(stockItems.first().getText()).toContain('Price:');
  });

  it('should not show a list of items in cart when cart is empty', function() {
    var cartItems = $('#cartItems');
    expect(cartItems.getText()).not.toContain('Price:');
  });

  it('should allow you to add an item to a shopping cart', function(){
    var stockItems = $$('#stockItems .item .item-name');
    var stockItemText = stockItems.first().getText()
    element(by.css('.add-to-cart')).click();
    var cartItems = $$('#cartItems .item .item-name');
    var cartItemText = cartItems.first().getText();
    expect(cartItemText).toEqual(stockItemText);
  });
});
