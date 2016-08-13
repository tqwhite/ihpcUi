import QUnit from 'steal-qunit';
import { ViewModel } from './conditions';

// ViewModel unit tests
QUnit.module('sr-careplanner/conditions');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the conditions component');
});
