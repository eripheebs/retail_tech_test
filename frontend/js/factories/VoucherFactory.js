retailTest.factory('VoucherFactory', function() {
  return {
    init: function(args) {
      this.code = args['code'];
      this.discount = args['discount'];
      this.minimumSpend = args['minimumSpend'];
      this.conditionalItem = args['conditionalItem'];
    }
  }
});
