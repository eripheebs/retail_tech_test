retailTest.factory('ItemLoggerFactory', function() {

  return {
    items: [],
    addItems: function(items){
      this.items = [].concat.apply(this.items, arguments);
    }
  }
});
