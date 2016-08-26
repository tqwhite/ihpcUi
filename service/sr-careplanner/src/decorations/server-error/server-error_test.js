import QUnit from 'steal-qunit';
import { ViewModel } from './server-error';

// ViewModel unit tests
QUnit.module('sr-careplanner/decorations/server-error');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the decorations-server-error component');
});
