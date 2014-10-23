var helpers = {
    'displayEvent_1': function(isoDay){
        var event = SH.Shifts.Events.fromWD( SH.Week.getString(), isoDay );
        if (event && event.name) return "("+event.name+")";
        return "";
    },
    'dailyTimeTotal': function (shift) {
        var total = 0;
        //TODO: implement transform class so dayOff!='on' could be hidden
        if (shift && shift.dayOff != 'on') {
            var sh = SH.Week.Time.spanInMinutesNormalized(shift.shiftBegin, shift.shiftEnd);
            if (sh != null) total += sh;
            sh = SH.Week.Time.spanInMinutesNormalized(shift.splitBegin, shift.splitEnd);
            if (sh != null) total += sh;
        }
        return total;
    },
    'dailyTimeTotalReal': function (shift) {
        var total = 0;
        if (shift && shift.dayOff != 'on') {
            var sh = SH.Week.Time.spanInMinutesNormalized(shift.shiftBeginReal, shift.shiftEndReal);
            if (sh != null) total += sh;
            sh = SH.Week.Time.spanInMinutesNormalized(shift.splitBeginReal, shift.splitEndReal);
            if (sh != null) total += sh;
        }
        return total;
    },
    'shiftStatusesList': function() {
        return _.map(_.values(SH.Shifts.status), function (item) {
            return {'status': item};
        });
    },
    shiftCellClass: function getCellClass(shift) {
        if (!shift) return '';
        if (shift.unpublished) return 'shift-cell-blue';
        if (shift.shiftStatus == SH.Shifts.status.LATE ||
            shift.splitStatus == SH.Shifts.status.LATE) return 'shift-cell-red';
        if (shift.shiftStatus == SH.Shifts.status.PENDING ||
            shift.splitStatus == SH.Shifts.status.PENDING) return 'shift-cell-orange';
        return 'shift-cell-green';
    }
};

Meteor.startup(function() {
    _.each(helpers, function (helper, key) {
       Blaze.registerHelper(key, helper);
    });
});