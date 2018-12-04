import QUnit from 'steal-qunit';
import { ViewModel } from './manage';

// ViewModel unit tests
QUnit.module('sr-careplanner/user/nurse/student/selectorplus/manage');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the user-nurse-student-selectorplus-manage component');
});
