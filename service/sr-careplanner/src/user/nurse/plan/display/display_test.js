import QUnit from 'steal-qunit';
import { ViewModel } from './display';

// ViewModel unit tests
QUnit.module('sr-careplanner/user/nurse/plan/display');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the user-nurse-plan-display component');
});
