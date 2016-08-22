retailTest.factory('ItemLoggerFactory', function() {
  return {
    items: [],
    addItems: function(items){
      this.items = [].concat.apply(this.items, arguments);
    },
    deleteItems: function(items){
      var self = this;

      var checkIfIncluded = function(item, n){
        if (!Array.isArray(arguments) && items == item) {
          return true
        } else if (item == arguments[n]) {
          return true
        } else if (n == items.length) {
          return (item == arguments[n])
        } else {
          return checkIfIncluded(item, n+1)
        }
      }

       var thereIsStillItemIncluded = function(){
         return !(count == self.items.length)
       }

       var count = 0;
       self.items.forEach(function(item, index){
         checkIfIncluded(item, 0) ? self.items.splice(index, 1) : count++
       });

       if (thereIsStillItemIncluded()) {
         self.deleteItems(items)
       }
    }
  }
});
