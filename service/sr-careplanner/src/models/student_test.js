import QUnit from 'steal-qunit';
import Student from './student';

QUnit.module('models/student');

QUnit.test('getList', function(){
  stop();
  Student.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
