describe('retailTest', function() {
  it('should get title of app', function() {
    browser.get('/');
    expect(browser.getTitle()).toEqual('Retail Tech Test');
  });
});
