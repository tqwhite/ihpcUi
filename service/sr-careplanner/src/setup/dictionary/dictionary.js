import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './dictionary.less!';
import template from './dictionary.stache!';
import User from "sr-careplanner/models/user";

/*

A few years later, I have found it useful to send two of these 
original elements when creating a student transfer. These
two things probably should have been moved into a property
of the user document in mongo. However, that's too much work.

Be aware future programmer, that infoPhone and district are
referenced in transfer.js and are put into properties
of the transfer object in mongo.

They are then used by the receiveTransfer function here.

tqii, 1/2018

*/

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the setup-dictionary component'
    }
  },
  
  renamePatterns:function(pattern){
  	const labels={
  		 writtenby: "IHP Author Name",
  		 district:	"District or Building Name",
  		 infoPhone: "Phone Number"
  	}
  	return labels[pattern] || pattern;
  
  },

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['setup-dictionary'] = this;
		console.log('added: window[' + "'" + 'setup-dictionary' + "'" + ']');
		console.dir({
			"setup-dictionary": this.attr(),
			'childComponentLists':this.childComponentLists
		});
	}
});


const localDataChangeHandler = function(domObj, event) {
	this.viewModel.attr('setupRootVm').dataChangeHandler({
		stacheObject: this,
		dataDomObj: domObj,
		saveObjectType: User,
		formContainerDomObj: domObj.parent().parent().parent()
	})
};

export default Component.extend({
  tag: 'setup-dictionary',
  viewModel: ViewModel,
  template,
	events: {
		'input change': localDataChangeHandler,
		'textarea change': localDataChangeHandler
	}
});