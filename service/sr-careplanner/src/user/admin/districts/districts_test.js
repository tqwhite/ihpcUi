import QUnit from 'steal-qunit';
import { ViewModel } from './districts';

// ViewModel unit tests
QUnit.module('sr-careplanner/district/admin/districts');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the district-admin-districts component');
});
