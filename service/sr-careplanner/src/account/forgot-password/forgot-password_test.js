import QUnit from 'steal-qunit';
import { ViewModel } from './forgot-password';

// ViewModel unit tests
QUnit.module('sr-careplanner/account/forgot-password');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the account-forgot-password component');
});
