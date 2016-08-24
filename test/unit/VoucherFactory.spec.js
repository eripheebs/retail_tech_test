describe('VoucherFactory', function() {
  beforeEach(module('retailTest'));

  var VoucherFactory;
  const RANDOM_NUM = (Math.random()*10 + 1);
  const RANDOM_NUM_2 = (Math.random()*10 + 1);

  beforeEach(inject(function(_VoucherFactory_) {
    VoucherFactory = _VoucherFactory_;
    voucher = Object.create(VoucherFactory);
    voucher.init({'code': 'CODE', 'discount': RANDOM_NUM, 'minimum': RANDOM_NUM_2});
  }));

  it('returns a voucher with discount, minimum spend etc', function() {
    expect(voucher.discount).toEqual(RANDOM_NUM);
  });
});
