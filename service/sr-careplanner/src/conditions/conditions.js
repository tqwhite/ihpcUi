import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './conditions.less!';
import template from './conditions.stache!';
import Boilerplate from "sr-careplanner/models/boilerplate";

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the conditions componentxxx'
    },
    boilerplate: {
		get: function() {
			const list=Boilerplate.getList({});
			return list;
		}
  }
  
  },
  clearConsole:function(){
  	console.clear();
  },
  
  reinitializeDb:function(){
	 $.ajax({
		url:'/api/boilerplate/reinitialize/'
	 }).done((err, result)=>{
		this.attr('%root').setNewPage('xxx');
		this.attr('%root').setNewPage('editor'); //trigger reload

	 });
  }

});

export default Component.extend({
  tag: 'conditions',
  viewModel: ViewModel,
  template
});