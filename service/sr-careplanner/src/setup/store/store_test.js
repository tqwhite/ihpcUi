import QUnit from 'steal-qunit';
import { ViewModel } from './store';

// ViewModel unit tests
QUnit.module('sr-careplanner/setup/store');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the setup-store component');
});
