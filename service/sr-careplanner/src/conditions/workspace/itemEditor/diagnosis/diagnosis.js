import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './diagnosis.less!';
import template from './diagnosis.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the conditions-workspace-item-editor-diagnosis component'
    }
  },
  
  testElement:function(x){
  	console.clear();
	console.dir({"conditions-workspace-item-editor-diagnosis component.attr()":this.attr()});
  },
  
});

export default Component.extend({
  leakScope: true,
  tag: 'conditions-workspace-item-editor-diagnosis',
  viewModel: ViewModel,
  template
});