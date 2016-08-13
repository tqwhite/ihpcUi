import fixture from 'can-fixture';

const store = fixture.store([{
  id: 0,
  description: 'First item'
}, {
  id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /api/conditions': store.findAll,
  'GET /api/conditions/{id}': store.findOne,
  'POST /api/conditions': store.create,
  'PUT /api/conditions/{id}': store.update,
  'DELETE /api/conditions/{id}': store.destroy
});

export default store;
