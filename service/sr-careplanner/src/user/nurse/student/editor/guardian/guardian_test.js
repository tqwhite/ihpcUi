import QUnit from 'steal-qunit';
import { ViewModel } from './guardian';

// ViewModel unit tests
QUnit.module('sr-careplanner/user/nurse/student/editor/guardian');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the user-nurse-student-editor-guardian component');
});
