import fixture from 'can-fixture';

const store = fixture.store([{
  _id: 0,
  description: 'First item'
}, {
  _id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /student': store.findAll,
  'GET /student/{_id}': store.findOne,
  'POST /student': store.create,
  'PUT /student/{_id}': store.update,
  'DELETE /student/{_id}': store.destroy
});

export default store;
