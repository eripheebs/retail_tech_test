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
    var stockItemNames = $$('#stockItems .item .item-name');
    var stockItemText = stockItemNames.first().getText();
    element(by.css('.add-to-cart')).click();
    var cartItemNames = $$('#cartItems .item .item-name');
    var cartItemText = cartItemNames.first().getText();
    expect(cartItemText).toEqual(stockItemText);
  });

  it('should allow you to delete items from shopping cart', function(){
    element(by.css('.add-to-cart')).click();
    element(by.css('.remove-from-cart')).click();
    var cartItems = $('#cartItems');
    expect(cartItems.getText()).not.toContain('Price:');
  });

  it('should show total price', function(){
    element(by.css('.add-to-cart')).click();
    var cartItemPrices = $$('#cartItems .item .item-price');
    var firstCartItemPrice = cartItemPrices.first().getText();
    var totalPrice = $('#total-price');
    expect(totalPrice.getText()).toContain(firstCartItemPrice);
  });

  it('should not have add to cart button if item is not in stock', function(){
    var noStockItem = $('.no-stock-true .add-to-cart');
    expect(noStockItem.getText()).not.toContain('Add to cart');
  });
});
