var helpers = {
    'displayEvent_1': function(isoDay){
        var event = SH.Shifts.Events.fromWD( SH.Week.getString(), isoDay );
        if (event) return "("+event.name+")";
        return "";
    },
    'dailyTimeTotal': function (shift) {
        var total = 0;
        if (shift) {
            var sh = SH.Week.Time.spanInMinutesNormalized(shift.shiftBegin, shift.shiftEnd);
            if (sh != null) total += sh;
            sh = SH.Week.Time.spanInMinutesNormalized(shift.splitBegin, shift.splitEnd);
            if (sh != null) total += sh;
        }
        return total;
    }
};

Meteor.startup(function() {
    _.each(helpers, function (helper, key) {
        UI.registerHelper(key, helper);
    });
});