import QUnit from 'steal-qunit';
import { ViewModel } from './plan';

// ViewModel unit tests
QUnit.module('sr-careplanner/setup/plan');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the setup-plan component');
});
