import QUnit from 'steal-qunit';
import { ViewModel } from './controls';

// ViewModel unit tests
QUnit.module('sr-careplanner/conditions/controls');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the conditions-controls component');
});
