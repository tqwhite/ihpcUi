import QUnit from 'steal-qunit';
import { ViewModel } from './forms';

// ViewModel unit tests
QUnit.module('sr-careplanner/forms');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the forms component');
});
