import QUnit from 'steal-qunit';
import { ViewModel } from './account';

// ViewModel unit tests
QUnit.module('sr-careplanner/account');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the account component');
});
