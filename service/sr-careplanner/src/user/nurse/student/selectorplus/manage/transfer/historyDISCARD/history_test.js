import QUnit from 'steal-qunit';
import { ViewModel } from './history';

// ViewModel unit tests
QUnit.module('sr-careplanner/user/nurse/student/selectorplus/manage/transfer/history');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the user-nurse-student-selectorplus-manage-transfer-history component');
});
