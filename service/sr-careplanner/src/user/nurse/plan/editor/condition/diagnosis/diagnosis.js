import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './diagnosis.less!';
import template from './diagnosis.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-plan-editor-condition-diagnosis component'
    }
  },
  
  notLast:function(){
  	return this.attr('index')!=(this.attr('count')-1);
  },

	testElement: function(x) {
		console.dir({
			"user-nurse-plan-editor-condition-diagnosis": this.attr()
		});
	}
});

export default Component.extend({
  tag: 'user-nurse-plan-editor-condition-diagnosis',
  viewModel: ViewModel,
  template
});