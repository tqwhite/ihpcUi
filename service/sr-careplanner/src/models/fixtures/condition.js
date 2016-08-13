import fixture from 'can-fixture';

const store = fixture.store([{
  id: 0,
  description: 'First item'
}, {
  id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /api/condition': store.findAll,
  'GET /api/condition/{id}': store.findOne,
  'POST /api/condition': store.create,
  'PUT /api/condition/{id}': store.update,
  'DELETE /api/condition/{id}': store.destroy
});

export default store;
