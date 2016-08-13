import QUnit from 'steal-qunit';
import { ViewModel } from './workspace';

// ViewModel unit tests
QUnit.module('sr-careplanner/conditions/workspace');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the conditions-workspace component');
});
