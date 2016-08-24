retailTest.factory('ItemLoggerFactory', function() {
  return {
    items: [],
    addItems: function(items){
      this.items = [].concat.apply(this.items, arguments);
    },
    deleteItems: function(items){
      var self = this;

      var args = (Array.isArray(items)) ? items : arguments;

      findAndDelete(args);

      function findAndDelete(args){
        for (var i = 0; i < args.length; i++){
          deleteFromArray(args[i], self.items);
        }
      }

      function deleteFromArray(item, array){
        for (var i = 0; i < array.length; i++){
          if (array[i] == item) {
            self.items.splice(i, 1);
            break;
          }
        }
      }
    }
  }
});
