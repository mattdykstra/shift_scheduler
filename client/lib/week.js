/**
 * Created by angelo on 10/12/14.
 */
SH = SH || {};

SH.Week = SH.Week || {};

SH.Week.get = function() {
    return this.dateFromString (Session.get( "weekStartDateString") );
};

SH.Week.set = function( momentObject ) {
    Session.set( "weekStartDateString",
        this.weekStartDateString( momentObject ) );
};

SH.Week.setCurrent = function(){
    this.set();
};

Meteor.startup(function(){
    SH.Week.setCurrent();
});

SH.Week.setPrevious = function(){
    var startWeek = SH.Week.get().day(-6);
    this.set( startWeek );
};

SH.Week.setNext = function(){
    var startWeek = SH.Week.get().day(8);
    this.set( startWeek );
};

SH.Subscriptions = SH.Subscriptions || {};


Meteor.autorun(function() {
    var role = Meteor.user() && Meteor.user().role;
    if (SH.Subscriptions.weeklyShifts) SH.Subscriptions.weeklyShifts.stop() ;

    if (role == 'business' || role == 'staff') {
        SH.Subscriptions.weeklyShifts = Meteor.subscribe('weeklyShifts',
            Session.get("weekStartDateString"));
    }
});

UI.registerHelper('isoWeekDays', function(){
    return [
        {'dayCode': 1},
        {'dayCode': 2},
        {'dayCode': 3},
        {'dayCode': 4},
        {'dayCode': 5},
        {'dayCode': 6},
        {'dayCode': 7}
    ]
});

UI.registerHelper('weekCode', function(){
    return SH.Week.getWeekCode (Seesion.get("weekStartDateString") )
});

var dateFormat = "ddd DD MMM";

UI.registerHelper('thDateFromDayCode', function(isoDay){
    var date = SH.Week.dateFromString( Session.get("weekStartDateString")).day(isoDay);
    return date.format(dateFormat);
});