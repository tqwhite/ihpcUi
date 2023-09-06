import QUnit from 'steal-qunit';
import { ViewModel } from './editor';

// ViewModel unit tests
QUnit.module('sr-careplanner/district/admin/districts/editor');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the user-admin-districts-editor component');
});
