import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './students.less!';
import template from './students.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-student-selectorplus-manage-students component'
    }
  },
  matchesFragment:function(last, gradeLevel){
  const searchField=this.attr('%root').attr('studentSearchField');
  const subject=searchField=='last'?last:gradeLevel;

  	const fragment=this.attr('%root').attr('filterFragment');
  	if (!fragment || subject.match(new RegExp(`^${fragment}`, 'i'))){
  		return true;
  	}
  return false;
  }
});

export default Component.extend({
  tag: 'user-nurse-student-selectorplus-manage-students',
  viewModel: ViewModel,
  template
});