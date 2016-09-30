import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './diagnosis.less!';
import template from './diagnosis.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-plan-editor-condition-diagnosis component'
    },
    
    showDiagnosisEditor:{
		value:false,
    	get:function(value){
    		if (this.attr('diagnosis').attr('shortName')){
    			return value;
    		}
    		else{
    		this.attr('showDiagnosisEditor', true);
    		return true;
    		}
    	}
    }
  },

	toggleEditView: function() {
		this.attr('showDiagnosisEditor', !this.attr('showDiagnosisEditor'));
	},

	testElement: function() {
		window['user-nurse-plan-editor-condition-diagnosis']=this;
		console.log('added: window['+"'"+'user-nurse-plan-editor-condition-diagnosis'+"'"+']');
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