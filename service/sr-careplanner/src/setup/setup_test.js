import QUnit from 'steal-qunit';
import { ViewModel } from './setup';

// ViewModel unit tests
QUnit.module('sr-careplanner/setup');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the setup component');
});
