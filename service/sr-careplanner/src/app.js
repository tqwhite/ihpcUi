import Map from "can/map/";
import route from "can/route/";
import Session from "sr-careplanner/models/session";

const AppViewModel = Map.extend({
  define: {
  session:{
  	value:function(){
				//placeholder for two-way binding to the form in login.stache
				return new Session({});
		}
  },
  systemCompanyName:{
  	value:'Sunrise River Press',
  	serialize:false
  },
  		systemProdName:{
		  value: 'Care Planner',
		  serialize: false
		},
		message: {
		  value: 'Hello World!',
		  serialize: false
		},
		title: {
		  value: 'sr-careplanner',
		  serialize: false
		}
	},
	  setNewPage:function(page, slug){
		slug=slug?slug:' ';
		route.attr({page:page, slug:slug});
	  },
	});

//can.route() gets the Map that is exported from here as default
route(':page', { page: 'account' });
route(':page/:slug', { slug: null });
route(':page/:slug/:action', { slug: null, action: null });

export default AppViewModel;
