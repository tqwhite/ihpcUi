import QUnit from 'steal-qunit';
import { ViewModel } from './user';

// ViewModel unit tests
QUnit.module('sr-careplanner/setup/user');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the setup-user component');
});
