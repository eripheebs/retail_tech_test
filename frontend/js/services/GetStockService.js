retailTest.service('GetStockService', ['$http', 'ItemFactory', function($http, ItemFactory){
  var self = this;

  self.getStock = function(){
    return $http.get('http://localhost:3000/api/stock')
    .then(handleResponseFromAPI, errorCallback);
  }

  function handleResponseFromAPI(response){
    var stock = response.data;
    var parsedStock = [];
    stock.forEach(function(item){
      if (item.stock == 0) {
        var newItem = createNewItem(item);
        parsedStock.push(newItem);
      } else {
        var newItem = createNewItem(item);
        for (var i = 0; i < item.stock; i++){
          parsedStock.push(newItem);
        }
      }
    });

    return parsedStock;

    function createNewItem(item){
      var newItem = Object.create(ItemFactory);
      newItem.init(item);
      return newItem;
    }
  }

  function errorCallback(error) {
    return error;
  }
}]);
