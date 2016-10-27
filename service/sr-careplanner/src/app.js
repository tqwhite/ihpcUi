import Map from "can/map/";
import Session from "sr-careplanner/models/session";
import qtools from "node_modules/qtools-minus/"; //I do not understand why I have to put node_modules here but not on can/map
import User from "sr-careplanner/models/user";

const AppViewModel = Map.extend({
	define: {
		loginUser: {
			get: function() {
				const session = this.attr('session');
				const loginUser = User.get({
					_id: session.attr('0')._id
				})

				loginUser.then((item) => {
window.AAA=item;
					const dictionary = item.attr('dictionary');
					if (dictionary.length === 0) {
						dictionary.push({
							pattern: 'writtenby',
							replacement: 'Written By'
						});
						dictionary.push({
							pattern: 'district',
							replacement: 'District'
						});
						item.save();
					}

				});

				return loginUser;
			},
		},
		richTextExperiment:{
			value:'',
			note:'any value turns on the experiment',
			note2:'*everything* associated with this experiment has this attribute, richTextExperiment',
			serialize: false
		},
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
	},
	activateModal:function(callback){
		$('body').one('click', callback);
	},
	reinitializeDb: function(database) {
		const currPage=this.attr('page');
		const initializers = {
			student: () => {
				$.ajax({
					url: '/api/student/reinitialize/'
				}).done((err, result) => {
					this.setNewPage('xxx');
					this.setNewPage(currPage); //trigger reload

				});
			},
			boilerplate: () => {
				$.ajax({
					url: '/api/boilerplate/reinitialize/'
				}).done((err, result) => {
					this.setNewPage('xxx');
					this.setNewPage(currPage); //trigger reload

				});
			},
			plan: () => {
				$.ajax({
					url: '/api/plan/reinitialize/'
				}).done((err, result) => {
					this.setNewPage('xxx');
					this.setNewPage(currPage); //trigger reload

				});
			},
			user: () => {
				$.ajax({
					url: '/api/user/reinitialize/'
				}).done((err, result) => {
					this.setNewPage('xxx');
					this.setNewPage(currPage); //trigger reload

				});
			},
		}

		initializers[database]();

	},
});


export default AppViewModel;
