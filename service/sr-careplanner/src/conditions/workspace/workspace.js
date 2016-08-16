import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './workspace.less!';
import template from './workspace.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the conditions-workspace component'
    },
    openConditionId: {
      value: '9',
      type:'*'
    }
  },
  
  closeCondition:function(event){
	event.stopPropagation();
	this.attr('openConditionId', '');
  },
  selectCondition:function(id){
	this.attr('openConditionId', id);
  }
  
});

export default Component.extend({
  tag: 'conditions-workspace',
  viewModel: ViewModel,
  template
});