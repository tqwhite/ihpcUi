import QUnit from 'steal-qunit';
import { ViewModel } from './completion';

// ViewModel unit tests
QUnit.module('sr-careplanner/setup/completion');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the setup-completion component');
});
