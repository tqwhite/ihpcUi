import Map from "can/map/";
import route from "can/route/";
import 'can/map/define/';
import 'can/route/pushstate/';

const AppViewModel = Map.extend({
  define: {
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


	// Set up the routes

route.map(AppViewModel);
route(':page', { page: 'account' });
route(':page/:slug', { slug: null });
route(':page/:slug/:action', { slug: null, action: null });

export default AppViewModel;
