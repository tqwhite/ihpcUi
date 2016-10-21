import QUnit from 'steal-qunit';
import { ViewModel } from './viewer';

// ViewModel unit tests
QUnit.module('sr-careplanner/user/nurse/viewer');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the user-nurse-viewer component');
});
