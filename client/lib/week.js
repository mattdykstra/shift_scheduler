/**
 * Created by angelo on 10/12/14.
 */
Meteor.startup(function(){
    Session.set("weekStartDateString" ,SH.Week.weekStartDateString() );
});


SH.Subscriptions = SH.Subscriptions || {};

var role = Meteor.user().role;
Meteor.autorun(function() {
    if (SH.Subscriptions.weeklyShifts) SH.Subscriptions.weeklyShifts.stop() ;

    if (role == 'business' || role == 'staff') {
        SH.Subscriptions.weeklyShifts = Meteor.subscribe('weeklyShifts',
            Session.get("weekStartDateString"));
    }
});
