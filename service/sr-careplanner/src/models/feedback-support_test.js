import QUnit from 'steal-qunit';
import FeedbackSupport from './feedback-support';

QUnit.module('models/feedback-support');

QUnit.test('getList', function(){
  stop();
  FeedbackSupport.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
