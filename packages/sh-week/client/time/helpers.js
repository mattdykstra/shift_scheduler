
var globalHelpers = {
    'minutesToHmmString': SH.Week.Time.minutesToHmmString
};

Meteor.startup(function() {
    _.each(globalHelpers, function (helper, key) {
        Template.registerHelper(key, helper);
    });
});