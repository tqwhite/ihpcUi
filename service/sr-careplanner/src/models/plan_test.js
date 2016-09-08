import QUnit from 'steal-qunit';
import Plan from './plan';

QUnit.module('models/plan');

QUnit.test('getList', function(){
  stop();
  Plan.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
