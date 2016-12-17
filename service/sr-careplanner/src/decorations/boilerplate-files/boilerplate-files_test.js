import QUnit from 'steal-qunit';
import { ViewModel } from './boilerplate-files';

// ViewModel unit tests
QUnit.module('sr-careplanner/decorations/boilerplate-files');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the decorations-boilerplate-files component');
});
