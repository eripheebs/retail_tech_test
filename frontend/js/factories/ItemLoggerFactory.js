retailTest.factory('ItemLoggerFactory', function() {

  return {
    items: [],
    addItem: function(item){
      this.items.push(item);
    }
  }
});
