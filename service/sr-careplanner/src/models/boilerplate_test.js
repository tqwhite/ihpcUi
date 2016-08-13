import QUnit from 'steal-qunit';
import Boilerplate from './boilerplate';

QUnit.module('models/boilerplate');

QUnit.test('getList', function(){
  stop();
  Boilerplate.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
