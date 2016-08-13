import fixture from 'can-fixture';

const store = fixture.store([{
  id: 0,
  description: 'First item'
}, {
  id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /api/boilerplate': store.findAll,
  'GET /api/boilerplate/{id}': store.findOne,
  'POST /api/boilerplate': store.create,
  'PUT /api/boilerplate/{id}': store.update,
  'DELETE /api/boilerplate/{id}': store.destroy
});

export default store;
