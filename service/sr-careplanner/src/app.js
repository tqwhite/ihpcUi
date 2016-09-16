import Map from "can/map/";
import Session from "sr-careplanner/models/session";
import qtools from "node_modules/qtools-minus/"; //I do not understand why I have to put node_modules here but not on can/map

const AppViewModel = Map.extend({
	define: {
		session: {
			value: function() {
				//placeholder for two-way binding to the form in login.stache
				return new Session({});
			},
			serialize: false //or, function(val, type){ return f(val); }
		},
		token: {
			value: {},
			serialize: false,
			type:'*',
			set:function(value){
				//someday, reinitialize session activity timeout here
				return value;

			}
		},
		systemCompanyName: {
			value: 'Sunrise River Press',
			serialize: false
		},
		systemProdName: {
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
		},
		page: {
			value: '',
			serialize: false,
		},
		slug: {
			value: '',
			serialize: false,
		},
		subsection: {
			value: '',
			serialize: false,
		},
		expiration:{
			value: '',
			serialize:false
		},
		browserLoaded:{
			get:function(){
				return window.location.href.match(/\w/);
			}
		}
	},
	setNewPage: function(page, slug, subsection) {
		this.attr('page', page);
		this.attr('slug', slug);
		this.attr('subsection', subsection);
	},
	logout: function() {
		window.location.href = '/';
	},
	clearConsole: function() {
		console.clear();
	}
});


export default AppViewModel;
