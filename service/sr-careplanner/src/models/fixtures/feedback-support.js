import fixture from 'can-fixture';

const store = fixture.store([{
  _id: 0,
  description: 'First item'
}, {
  _id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /feedback-support': store.findAll,
  'GET /feedback-support/{_id}': store.findOne,
  'POST /feedback-support': store.create,
  'PUT /feedback-support/{_id}': store.update,
  'DELETE /feedback-support/{_id}': store.destroy
});

export default store;
