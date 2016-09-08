import fixture from 'can-fixture';

const store = fixture.store([{
  _id: 0,
  description: 'First item'
}, {
  _id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /api/plan': store.findAll,
  'GET /api/plan/{_id}': store.findOne,
  'POST /api/plan': store.create,
  'PUT /api/plan/{_id}': store.update,
  'DELETE /api/plan/{_id}': store.destroy
});

export default store;
