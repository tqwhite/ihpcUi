import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './main-footer.less!';
import template from './main-footer.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: "The School Nurse's Health Planning Resource"
    }
	
  },
	  
	testTemplate:can.stache("<h3>{{../systemProdName}}</h3>"), //this works as {{>testTemplate}} and presents Hello World!! from app.js
	testScopeHelper:function(args){
		//works with call {{testScopeHelper(mess=message)}}, shows values from scope map above
		return can.stache.safeString('('+args.mess+')');
	},
});




can.stache.registerHelper('testHelper', function(name, options){
	//options is documented https://canjs.com/docs/can.stache.helperOptions.html
	//if name is not specified in the call, name gets the options
	//this works as {{testHelper 'tq'}} or {{testHelper attrName}} 
	//or {{{genHtml data}}} if the result should not be escaped
	//note: options.scope.attr() does not work. It must have a property name.
	//however, it refers to the viewModel.
	//eg, options.scope.attr('message')
	return `${name} ${new Date().getUTCFullYear()}`;
});


can.stache.registerHelper('testFunctionHelper', function(name, options){
return function(el){
//return values are not used from this
//this works called like <div id='tqtest'{{testFunctionHelper 'white'}} />
 $(el).html(name.toUpperCase()).css('color', 'rgb(176, 18, 0)');
}
});


export default Component.extend({
  tag: 'main-footer',
  viewModel: ViewModel,
  template
});