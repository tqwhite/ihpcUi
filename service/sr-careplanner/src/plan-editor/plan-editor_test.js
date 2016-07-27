import QUnit from 'steal-qunit';
import { ViewModel } from './plan-editor';

// ViewModel unit tests
QUnit.module('sr-careplanner/plan-editor');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the plan-editor component');
});
