import QUnit from 'steal-qunit';
import { ViewModel } from './main-footer';

// ViewModel unit tests
QUnit.module('sr-careplanner/decorations/main-footer');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the main-footer component');
});
