import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './boilerplate-files.less!';
import template from './boilerplate-files.stache!';

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the decorations-boilerplate-files component'
		},
		staticFiles: {
			value: '',
			type: '*',
			serialize: false,
			set: function(value) {
				const workingObject = value.attr();
				const outObject = {};
				for (var inx in workingObject) {
					var element = workingObject[inx];
					if (['filename', 'urlSegment'].indexOf(inx) > -1) {
						console.log("inx=" + inx);
						continue;
					}
					element.title = inx.replace(/_/g, ' ');;
					outObject[inx] = element;
				}
				return outObject;
			}
		}
	},

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['decorations-boilerplate-files'] = this;
		console.log('added: window[' + "'" + 'decorations-boilerplate-files' + "'" + ']');
		console.dir({
			"decorations-boilerplate-files": this.attr(),
			"decorations-boilerplate-files.staticFiles": this.attr('staticFiles')
		});
	}
});

export default Component.extend({
	tag: 'decorations-boilerplate-files',
	viewModel: ViewModel,
	template
});