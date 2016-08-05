import QUnit from 'steal-qunit';
import { ViewModel } from './permissionMaster';

// ViewModel unit tests
QUnit.module('sr-careplanner/account/login/permissionMaster');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the account-login-permission-master component');
});
