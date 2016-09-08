import QUnit from 'steal-qunit';
import { ViewModel } from './shopper';

// ViewModel unit tests
QUnit.module('sr-careplanner/user/nurse/plan/shopper');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the user-nurse-plan-shopper component');
});
