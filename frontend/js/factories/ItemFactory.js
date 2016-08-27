retailTest.factory('ItemFactory', function(){
  return {
    init: function(args){
      this.name = args['name'];
      this.category = args['category'];
      this.price = args['price'];
      this.no_stock = this.checkOutOfStock(args['stock']);
    },
    checkOutOfStock: function(quantityInStock){
      if (quantityInStock == 0) { return true };
      return false;
    }
  }
});
