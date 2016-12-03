import QUnit from 'steal-qunit';
import { ViewModel } from './change-password';

// ViewModel unit tests
QUnit.module('sr-careplanner/account/change-password');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the account-change-password component');
});
