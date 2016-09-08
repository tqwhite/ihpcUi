import QUnit from 'steal-qunit';
import { ViewModel } from './control';

// ViewModel unit tests
QUnit.module('sr-careplanner/user/nurse/plan/control');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the user-nurse-plan-control component');
});
