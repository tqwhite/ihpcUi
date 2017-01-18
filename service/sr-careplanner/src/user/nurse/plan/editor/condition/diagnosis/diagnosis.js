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

		showDiagnosisEditor: {
			value: false,
			get: function(value) {
				if (this.attr('diagnosis').attr('shortName')) {
					return value;
				} else {
					this.attr('showDiagnosisEditor', true);
					return true;
				}
			}
		}
	},
	
	setTextareaSize:function(segment, textareaId, inObj){
		setTimeout(()=>{
			const inString=inObj[segment];
			const textArea=$('textarea#'+segment+'_'+textareaId);
			const measurementString=inString.replace(/\n/g, "<br/>");
			const measurementObj=$("<div class='c-field textareaWidth' style='display:none;'>"+measurementString+"</div>");
			$('body').prepend(measurementObj);
			let newHeight=measurementObj.height();
			measurementObj.remove()


			textArea.height(Math.max(newHeight, 60));
		}, 10); //need to let the dom get written before acting on it
	},

	toggleEditView: function() {
		this.attr('showDiagnosisEditor', !this.attr('showDiagnosisEditor'));
	},

	testElement: function() {
		window['user-nurse-plan-editor-condition-diagnosis'] = this;
		console.log('added: window[' + "'" + 'user-nurse-plan-editor-condition-diagnosis' + "'" + ']');
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