import fixture from 'can-fixture';

const store = fixture.store([{
  _id: 0,
  description: 'First item'
}, {
  _id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /feedbackSupport': store.findAll,
  'GET /feedbackSupport/{_id}': store.findOne,
  'POST /feedbackSupport': store.create,
  'PUT /feedbackSupport/{_id}': store.update,
  'DELETE /feedbackSupport/{_id}': store.destroy
});

export default store;
