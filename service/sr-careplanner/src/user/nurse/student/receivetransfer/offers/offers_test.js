import QUnit from 'steal-qunit';
import { ViewModel } from './offers';

// ViewModel unit tests
QUnit.module('sr-careplanner/user/nurse/student/receivetransfer/offers');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the user-nurse-student-receivetransfer-offers component');
});
