import QUnit from 'steal-qunit';
import { ViewModel } from './controls';

// ViewModel unit tests
QUnit.module('sr-careplanner/user/nurse/student/receivetransfer/execute/controls');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the user-nurse-student-receivetransfer-execute-controls component');
});
