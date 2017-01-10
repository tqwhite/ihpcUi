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
					var element = {};
					element.title = inx.replace(/_/g, ' ');;
					element.fileList=workingObject[inx]
					outObject[inx] = element;
				}
				return outObject;
			}
		}
	},
	
	multipleFiles:function(fileList){
		return fileList.length>1;
	},
	
	showFilesMenu:function(target, event){

		if(!this.fileListShowing){
			let fileList=target.parent().find('.fileList');
			if (fileList.length==0){
				fileList=target.parent().parent().find('.fileList');
			}
		
			fileList.show();
			this.fileListShowing=true;
			setTimeout(()=>{
			$('body').one('click', ()=>{
				fileList.hide()
				this.fileListShowing=false;
			});
			}, 100)
		}
	},
	
	firstUrlSegment:function(element){
		return element.fileList[0].urlSegment;
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
  leakScope: true,
	tag: 'decorations-boilerplate-files',
	viewModel: ViewModel,
	events: {
		'.fileListButton click': function(el, event) {
			this.viewModel.showFilesMenu($(event.target), event);
		}

	},
	template
});