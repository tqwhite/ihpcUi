import QUnit from 'steal-qunit';
import { ViewModel } from './selector';

// ViewModel unit tests
QUnit.module('sr-careplanner/user/admin/users/selector');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the user-admin-users-selector component');
});
