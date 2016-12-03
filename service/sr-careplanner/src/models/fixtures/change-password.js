import fixture from 'can-fixture';

const store = fixture.store([{
  _id: 0,
  description: 'First item'
}, {
  _id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /changePassword': store.findAll,
  'GET /changePassword/{_id}': store.findOne,
  'POST /changePassword': store.create,
  'PUT /changePassword/{_id}': store.update,
  'DELETE /changePassword/{_id}': store.destroy
});

export default store;
