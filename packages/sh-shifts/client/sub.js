Meteor.startup(function(){
    Meteor.subscribe('weeklyShifts', SH.Week.getString());
});
