import QUnit from 'steal-qunit';
import ChangePassword from './change-password';

QUnit.module('models/change-password');

QUnit.test('getList', function(){
  stop();
  ChangePassword.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
