import fixture from 'can-fixture';

const store = fixture.store([{
  _id: 0,
  description: 'First item'
}, {
  _id: 1,
  description: 'Second item'
}]);

fixture({
  'GET http://localhost/api/user': store.findAll,
  'GET http://localhost/api/user/{_id}': store.findOne,
  'POST http://localhost/api/user': store.create,
  'PUT http://localhost/api/user/{_id}': store.update,
  'DELETE http://localhost/api/user/{_id}': store.destroy
});

export default store;
