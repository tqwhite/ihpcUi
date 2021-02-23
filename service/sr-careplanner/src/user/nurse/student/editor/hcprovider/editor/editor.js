import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './editor.less!';
import template from './editor.stache!';
import qtools from 'lib/qtools-minus/';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-student-editor-hcprovider-editor component'
    }
  },
  tempTest:function(){
  
console.log(`\n=-=============   tempTest  ========================= [editor.js.tempTest]\n`);


qtools.listAttributes(this.attr('selectedProvider'), {showValues:true});

  }
});

export default Component.extend({
  tag: 'user-nurse-student-editor-hcprovider-editor',
  viewModel: ViewModel,
  template,
	events: {
		'button click': function(el, event) {
			event.stopPropagation(); //stop from cancelling modal

			const selectedProvider = this.viewModel.attr('selectedProvider');

			selectedProvider.each((item, key) => {
				if (key != '_id') {
					selectedProvider.attr(key, '');
				}
			});
			this.viewModel.attr('studentEditorVm').saveObject(()=>this.viewModel.attr('showEditor', false));
		},
		click: function(el, event) {
			event.stopPropagation(); //stop from cancelling modal
		}
	}
});