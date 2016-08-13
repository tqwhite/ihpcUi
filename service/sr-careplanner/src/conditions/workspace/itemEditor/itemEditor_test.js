import QUnit from 'steal-qunit';
import { ViewModel } from './itemEditor';

// ViewModel unit tests
QUnit.module('sr-careplanner/conditions/workspace/itemEditor');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the conditions-workspace-item-editor component');
});
