import F from 'funcunit';
import QUnit from 'steal-qunit';

F.attach(QUnit);

QUnit.module('sr-careplanner functional smoke test', {
  beforeEach() {
    F.open('../development.html');
  }
});

QUnit.test('sr-careplanner main page shows up', function() {
  F('title').text('sr-careplanner', 'Title is set');
});
