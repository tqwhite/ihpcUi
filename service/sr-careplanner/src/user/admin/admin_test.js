import QUnit from 'steal-qunit';
import { ViewModel } from './admin';

// ViewModel unit tests
QUnit.module('sr-careplanner/user/admin');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the user-admin component');
});
