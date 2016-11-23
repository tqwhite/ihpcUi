import QUnit from 'steal-qunit';
import { ViewModel } from './forgotpw';

// ViewModel unit tests
QUnit.module('sr-careplanner/account/forgotpw/');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the account-forgotpw component');
});
