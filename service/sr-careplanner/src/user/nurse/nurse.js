import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nurse.less!';
import template from './nurse.stache!';
import Student from "sr-careplanner/models/student";
import Plan from "sr-careplanner/models/plan";
import qtools from "node_modules/qtools-minus/";

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse component'
		},
		students: {
			get: function() {
				const list = Student.getList({});
				return list;
			}
		},
		plans: {
			get: function() {
				const list = Plan.getList({
					studentRefId: this.attr('openStudentRefId')
				});
				this.pickRecent(list);
				return list;
			}
		},

		showStudentEditor: {
			value: false
		},
		openStudentRefId: {
			value: '',
			type: 'string',
			set: function(value) {
				return value;
			}
		},
		newStudentFlag: {
			value: false,
			type: 'boolean',
			set: function(value) {
				return value;
			}
		},
		openStudentNameString: {
			value: '',
			type: 'string',
			set: function(value) {
				return value;
			}
		},
		workingPlan: {
			value: Plan,
			type: '*'
		},
		latestRefId: {
			value: 'hello',
			get: function() {

				const refIdPlanList = this.attr('refIdPlanList');
				const openStudentRefId = this.attr('openStudentRefId');

				if (refIdPlanList) {
					return refIdPlanList.attr(openStudentRefId);
				}
				return '';
			}
		}
	},

	pickRecent: function(plansMap) {
		//note: this creates a persistent object because .then doesn't run when a student is
		//loaded a second time. May need to revise once 'new plan' is created.
		let chosen;

		if (!this.attr('refIdPlanList')) {
			this.attr('refIdPlanList', {})
		}
		plansMap.then((result) => {
			result.each((item) => {
				chosen = item.attr('refId');
			});
		if (chosen) {
			const refIdPlanList = this.attr('refIdPlanList');
			const openStudentRefId = this.attr('openStudentRefId');
			refIdPlanList.attr(openStudentRefId, chosen);
		}
		});

	},

	createNewStudent: function() {
		this.attr('showStudentEditor', true);
		this.attr('newStudentFlag', true);

	},

	showSummary: function() {
		this.attr('showStudentEditor', false);
		this.attr('newStudentFlag', false);
	},

	hideSummary: function() {
		this.attr('showStudentEditor', true);
	},

	testElement: function(x) {
		console.dir({
			"user-nurse": this.attr(),
			"students": this.attr('students'),
			"plans": this.attr('plans'),
		});
	},








	reinitializeDb: function(database) {
		const initializers = {
			student: () => {
				$.ajax({
					url: '/api/student/reinitialize/'
				}).done((err, result) => {
					this.attr('%root').setNewPage('xxx');
					this.attr('%root').setNewPage('nurse'); //trigger reload

				});
			},
			boilerplate: () => {
				$.ajax({
					url: '/api/boilerplate/reinitialize/'
				}).done((err, result) => {

				});
			},
			plan: () => {
				$.ajax({
					url: '/api/plan/reinitialize/'
				}).done((err, result) => {
					this.attr('%root').setNewPage('xxx');
					this.attr('%root').setNewPage('nurse'); //trigger reload

				});
			},
		}

		initializers[database]();

	},
});

export default Component.extend({
	tag: 'user-nurse',
	viewModel: ViewModel,
	template
});