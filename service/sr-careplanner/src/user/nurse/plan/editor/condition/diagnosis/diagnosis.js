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

		if (this.attr('%root').attr('richTextExperiment')) {
			console.log("this.attr('%root').attr('richTextExperiment')=" + this.attr('%root').attr('richTextExperiment'));


			setTimeout(() => {
				$('div.richText').each((inx, item) => {
					const instance = tinymce.init({
						selector: 'div.richText:nth-child(' + inx + ')',
						inline: true,
						plugins: [
							'tabfocus textcolor colorpicker advlist autolink lists link image charmap print preview anchor',
							'searchreplace visualblocks code fullscreen',
							'insertdatetime media table contextmenu paste'
						],
						toolbar: 'forecolor backcolor insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
					}).then(() => {
						$('div.richText').each((inx, item) => {
							const id = $(item).attr('id');
							const editor = tinymce.get(id).setContent($(item).attr('value').replace(/\n/g, '<br/>'));
						});

					});

				});
			}, 100);
		}
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