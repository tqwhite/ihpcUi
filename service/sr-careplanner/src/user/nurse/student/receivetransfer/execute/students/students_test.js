import QUnit from 'steal-qunit';
import { ViewModel } from './students';

// ViewModel unit tests
QUnit.module('sr-careplanner/user/nurse/student/receivetransfer/execute/students');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the user-nurse-student-receivetransfer-execute-students component');
});
