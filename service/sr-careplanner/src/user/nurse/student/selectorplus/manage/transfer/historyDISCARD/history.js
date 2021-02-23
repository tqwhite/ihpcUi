import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './history.less!';
import template from './history.stache!';
import Transfer from 'sr-careplanner/models/transfer';
import qtools from 'lib/qtools-minus/';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-student-selectorplus-manage-transfer-history component'
    }
  },
  formatDate:function(inDate){
  	const date=new Date(inDate);
  	return date.toLocaleDateString();
  }
});

export default Component.extend({
  tag: 'user-nurse-student-selectorplus-manage-transfer-history',
  viewModel: ViewModel,
  template
});