var helpers = {
    'displayEvent_1': function(isoDay){
        var event = SH.Shifts.Events.fromWD( SH.Week.getString(), isoDay );
        if (event) return "("+event.name+")";
        return "";
    }
};

Meteor.startup(function() {
    _.each(helpers, function (helper, key) {
        UI.registerHelper(key, helper);
    });
});