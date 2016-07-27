import QUnit from 'steal-qunit';
import { ViewModel } from './help';

// ViewModel unit tests
QUnit.module('sr-careplanner/help');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the help component');
});
