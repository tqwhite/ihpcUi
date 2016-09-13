import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './editor.less!';
import template from './editor.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-plan-editor component'
    }
  },

	testElement: function(x) {
		console.dir({
			"user-nurse-plan-editor": this.attr()
		});
	},
});

export default Component.extend({
  tag: 'user-nurse-plan-editor',
  viewModel: ViewModel,
  template
});