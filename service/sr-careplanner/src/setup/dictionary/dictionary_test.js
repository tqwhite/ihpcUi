import QUnit from 'steal-qunit';
import { ViewModel } from './dictionary';

// ViewModel unit tests
QUnit.module('sr-careplanner/setup/dictionary');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the setup-dictionary component');
});
