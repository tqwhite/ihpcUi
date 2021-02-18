import QUnit from 'steal-qunit';
import { ViewModel } from './editor';

// ViewModel unit tests
QUnit.module('sr-careplanner/user/nurse/student/editor/guardian/editor');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the user-nurse-student-editor-guardian-editor component');
});
