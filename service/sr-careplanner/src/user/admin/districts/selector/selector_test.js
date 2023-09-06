import QUnit from 'steal-qunit';
import { ViewModel } from './selector';

// ViewModel unit tests
QUnit.module('sr-careplanner/district/admin/districts/selector');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the user-admin-districts-selector component');
});
