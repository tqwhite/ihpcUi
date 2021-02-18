import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './parent.less!';
import template from './parent.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-student-editor-parent component'
    },
    showEditor: {
      value: false
    }
  },
  
  activateEditor:function(event){
  	this.attr('showEditor', true);
  }
});

export default Component.extend({
  tag: 'user-nurse-student-editor-parent',
  viewModel: ViewModel,
  template
});