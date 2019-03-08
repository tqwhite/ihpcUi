import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './selectorplus.less!';
import template from './selectorplus.stache!';
import qtools from 'node_modules/qtools-minus/';

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-student-selectorplus component'
		},
		searchField: {
			value: '',
			serialize: false
		},
		transferStudentList: {
			value: [],
			serialize: false
		},
		transferStudentListLength: {
			value: 0,
			serialize: false
		},
		selectorPlusFunctionMode: {
			value: 'selector',
			serialize: false
		},
		managerComponentInstructionDisplayController: {
			//this is initialized by the selectorPlus/manager component at startup of transfer mode
			serialize: false
		}
	},
	getViewModel: function() {
		return this;
	},
	cleartransferStudentList: function() {
		this.attr('transferStudentList', []);
		this.attr('transferStudentListLength', 0);
	},
	toggleFunction: function(event) {
		event.stopPropagation();
		const mode = this.attr('selectorPlusFunctionMode');
		const functionStatus = mode == 'selector' ? 'transfer' : 'selector';
		this.attr('selectorPlusFunctionMode', functionStatus);

		if (functionStatus == 'transfer') {
			const managerComponentInstructionDisplayController = this.attr('managerComponentInstructionDisplayController');

			(function() {
				var throttle = function(type, name, obj) {
					obj = obj || window;
					var running = false;
					var func = function() {
						if (running) {
							return;
						}
						running = true;
						requestAnimationFrame(function() {
							obj.dispatchEvent(new CustomEvent(name));
							running = false;
						});
					};
					obj.addEventListener(type, func);
				};

				/* init - you can init any event */
				throttle('resize', 'optimizedResize');
			})(); //thanks:https://developer.mozilla.org/en-US/docs/Web/Events/resize

			window.addEventListener('optimizedResize', function() {
				managerComponentInstructionDisplayController();
			});
		} else {
			window.target.removeEventListener('optimizedResize');
		}
	},

	activateMenu: function(event) {
		event.stopPropagation();
		this.attr('%root').attr('showStudentManager', true);
		this.attr('%root').activateModal(() => {
			this.attr('%root').attr('showStudentManager', false);
		});
	},
	selectStudent: function(student, selectorPlusFunctionMode) {
		if (student.attr('transferStatus') == 'pending') {
			return;
		}

		if (selectorPlusFunctionMode == 'selector') {
			this.editStudent(student);
		} else {
			this.toggletransferStudentListElement(student);
		}
	},
	toggletransferStudentListElement: function(student) {
		if (this.ontransferStudentList(student)) {
			const thisRefId = student.attr('refId');
			this.attr(
				'transferStudentList',
				this.attr('transferStudentList').filter(
					item =>
						item.attr('refId') != thisRefId || !this.ontransferStudentList(item)
				)
			);
		} else {
			this.attr('transferStudentList').push(student);
		}
		this.attr(
			'transferStudentListLength',
			this.attr('transferStudentList').length
		);
	},
	ontransferStudentList: function(student) {
		const refId = student.attr('refId');
		return this.attr('transferStudentList').filter(
			item => item.attr('refId') == refId
		).length
			? true
			: false;
	},
	editStudent: function(student) {
		this.attr('%root').attr('showStudentManager', false);

		this.attr('parentVm').setTool('editor'); //activate student editor, leaves in current state, summary or edit

		this.attr('parentVm').attr('newStudentFlag', false);
		this.attr('parentVm').attr('openStudentRefId', student.attr('refId'));
		this.attr('parentVm').attr(
			'openStudentNameString',
			student.attr('last') + ', ' + student.attr('first')
		);
		this.attr('parentVm').attr('workingPlan', {}); //don't inherit previous guy's plan if new one has none

		this.attr('parentVm').attr('showPlanSelector', true); //selector tries to show itself and auto-opens a plan if it can
	},

	toggleInactive: function() {
		this.attr('parentVm').attr(
			'showInactiveStudents',
			!this.attr('parentVm').attr('showInactiveStudents')
		);
	},

	createNewStudent: function() {
		this.attr('%root').attr('showStudentManager', false);
		this.attr('parentVm').setTool('editor');
		this.attr('parentVm').attr('showStudentEditor', true); //forces editor (not summary), otherwise controlled by user in editor
		this.attr('parentVm').attr('openStudentRefId', qtools.newGuid());

		this.attr('parentVm').attr('workingPlan', {});
		this.attr('parentVm').attr('openStudentNameString', 'Creating Student');

		/*
			When an existing student is chosen, it's values overwrite the all the previous
			student's fields. When New Student is chosen, it's empty and doesn't overwrite
			whatever was there previously. The following setTimeout() prevents previous values from
			remaining if New Student is chosen twice in a row (with no intervening editing
			of a previously existing student).
		*/
		setTimeout(() => {
			this.attr('parentVm').attr('newStudentFlag', false); //remove student editor

			setTimeout(() => {
				this.attr('parentVm').attr('newStudentFlag', true); //display new student editor
			}, 1);
		}, 1);
		this.attr('parentVm').attr('newStudentFlag', true);
	},

	studentShouldBeShown: function(usage, student, showInactiveStudents) {
		switch (usage) {
			case 'fullSelection':
				const inactive = student.attr('inactive');
				return !inactive || (inactive && showInactiveStudents);
				break;
			case 'transferOnly':
				const isTransfer = this.ontransferStudentList(student);
				return isTransfer;
				break;
			default:
				$('body').html('TQ screwed up #6'); //note: there are no #1-5
				break;
		}
	}
});

export default Component.extend({
	tag: 'user-nurse-student-selectorplus',
	viewModel: ViewModel,
	events: {
		'li click': function(el, event) {
			this.viewModel.activateMenu(event);
		},

		click: function(el, event) {
			if ($(event.target).hasClass('close')) {
				return;
			}
			event.stopPropagation();
		}
	},
	template
});
