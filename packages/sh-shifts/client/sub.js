Meteor.startup(function() {
    Meteor.autorun(function () {
        Meteor.subscribe('weeklyShifts', SH.Week.getString());
    });
});
