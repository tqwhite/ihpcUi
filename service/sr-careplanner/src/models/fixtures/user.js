import fixture from 'can-fixture';

const store = fixture.store([{
  _id: 0,
  description: 'First item'
}, {
  _id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /user': store.findAll,
  'GET /user/{_id}': store.findOne,
  'POST /user': store.create,
  'PUT /user/{_id}': store.update,
  'DELETE /user/{_id}': store.destroy
});

export default store;
