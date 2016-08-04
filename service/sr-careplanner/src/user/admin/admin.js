import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './admin.less!';
import template from './admin.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-admin component'
    },
    subsection:{
    	value:'users'
    }
  },
  setSubsection:function(subsection){
  	this.attr('subsection', subsection);
  }
});

export default Component.extend({
  tag: 'user-admin',
  viewModel: ViewModel,
  template
});