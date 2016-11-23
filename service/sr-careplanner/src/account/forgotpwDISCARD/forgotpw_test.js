import QUnit from 'steal-qunit';
import { ViewModel } from './forgotpw';

// ViewModel unit tests
QUnit.module('<%= module %>');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the forgotpw component');
});
