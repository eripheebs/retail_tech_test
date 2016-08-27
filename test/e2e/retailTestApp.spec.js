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

  describe('Applying vouchers', function(){
    it('should be able to apply a voucher', function(){
      element(by.css('.add-to-cart')).click();
      element(by.css('.add-to-cart')).click();
      element(by.css('.add-to-cart')).click()
      var totalPrice = parseInt($('#total-price').evaluate('shoppingCartTotal'));
      var voucherInput = element(by.css('#voucher-input'));
      voucherInput.sendKeys('FIVE');
      element(by.css('#voucher-submit')).click();
      var newPrice = parseInt($('#total-price').evaluate('shoppingCartTotal'));
      var confirmationMessage = $('#voucher-message').getText();
      expect(newPrice).toEqual(totalPrice - 5);
      expect(confirmationMessage).toEqual('Your voucher has been applied.');
    });

    it('should hide voucher form if a voucher was applied', function(){
      element(by.css('.add-to-cart')).click();
      element(by.css('.add-to-cart')).click();
      element(by.css('.add-to-cart')).click();
      var voucherInput = element(by.css('#voucher-input'));
      voucherInput.sendKeys('FIVE');
      element(by.css('#voucher-submit')).click();
      var voucherForm = $('#voucher');
      expect(voucherForm.getText()).not.toContain('Add Voucher');
    });

    it('should show error if voucher unapplicable', function(){
      element(by.css('.add-to-cart')).click();
      var voucherInput = element(by.css('#voucher-input'));
      voucherInput.sendKeys('FIFTEEN');
      element(by.css('#voucher-submit')).click();
      var errorMessage = $('#voucher-message').getText();
      expect(errorMessage).toEqual('That voucher is not applicable.');
    });

    it('should show error if voucher incorrect', function(){
      element(by.css('.add-to-cart')).click();
      var voucherInput = element(by.css('#voucher-input'));
      voucherInput.sendKeys('BADCODE');
      element(by.css('#voucher-submit')).click();
      var errorMessage = $('#voucher-message').getText();
      expect(errorMessage).toEqual('The voucher code is incorrect.');
    });
  });
});
