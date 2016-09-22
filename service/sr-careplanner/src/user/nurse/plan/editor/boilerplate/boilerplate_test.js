import QUnit from 'steal-qunit';
import { ViewModel } from './boilerplate';

// ViewModel unit tests
QUnit.module('sr-careplanner/user/nurse/plan/editor/boilerplate');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the user-nurse-plan-editor-boilerplate component');
});
