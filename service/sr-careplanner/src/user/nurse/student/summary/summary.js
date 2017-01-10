import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './summary.less!';
import template from './summary.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-student-summary component'
    }
  },

	testElement: function() {
		window['user-nurse-student-summary']=this;
		console.log('added: window['+"'"+'user-nurse-student-summary'+"'"+']');
		console.dir({
			"user-nurse-student-summary": this.attr()
		});
	},
});

export default Component.extend({
  leakScope: true,
  tag: 'user-nurse-student-summary',
  viewModel: ViewModel,
  template
});