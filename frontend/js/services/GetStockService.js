retailTest.service('GetStockService', ['$http', 'ItemFactory', function($http, ItemFactory){
  var self = this;

  self.getStock = function(){
    return $http.get('http://localhost:3000/api/stock')
    .then(handleResponseFromAPI, errorCallback);
  }

  function handleResponseFromAPI(response){
    var stock = response.data.stock;
    var parsedStock = [];
    stock.forEach(function(item){
      if (item.stock == 0) {
        createNewItem(item);
      } else {
        for (var i = 0; i < item.stock; i++){
          createNewItem(item);
        }
      }
    });

    return parsedStock;

    function createNewItem(item){
      var newItem = Object.create(ItemFactory);
      newItem.init(item);
      parsedStock.push(newItem);
    }
  }

  function errorCallback(error) {
    return error;
  }
}]);
