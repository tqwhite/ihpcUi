import Component from 'can/component/';
import Map from 'can/map/';
import route from "can/route/";
import 'can/map/define/';
import './main-header.less!';
import template from './main-header.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the main-header component'
    }
  },
  logout:function(page, slug){
  	console.log("main-header wants a logout function");
  	route.attr({page:page, slug:slug});
  }
});


export default Component.extend({
  tag: 'main-header',
  viewModel: ViewModel,
  template
});