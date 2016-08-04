import QUnit from 'steal-qunit';
import { ViewModel } from './nurse';

// ViewModel unit tests
QUnit.module('sr-careplanner/user/nurse');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the user-nurse component');
});
