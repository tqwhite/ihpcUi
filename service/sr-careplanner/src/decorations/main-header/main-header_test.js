import QUnit from 'steal-qunit';
import { ViewModel } from './main-header';

// ViewModel unit tests
QUnit.module('sr-careplanner/decorations/main-header');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the main-header component');
});
