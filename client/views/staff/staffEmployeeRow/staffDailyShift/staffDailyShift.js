Template.staffDailyShift.rendered = function () {

};

Template.staffDailyShift.helpers({
    'shift': function() {
        var selector = _.pick(this, ['dayCode', 'employeeId']);
        _.extend( selector, {
            weekCode: SH.Week.getWeekCode(SH.Week.getString() ),
            businessId: SH.businessId(),
            tag: {$exists: false}
        });

        return SH.Shifts.collection.findOne(selector) ;
    },
    'DailyTimeTotal': function(shift) {
        return SH.Week.Time.minutesToHmmString(
            Blaze._globalHelpers['dailyTimeTotal'](shift), true ); //todo: refactor into SH.Shifts....
    },
    'shiftCellClass': function(shift) {
        if (!shift) return '';
        if (!shift.staffEdited) return 'shift-cell-green';
        if (shift.staffEdited) return 'shift-cell-orange';
        return '';
    },
    'shiftClass': function(shift) {
        if (!shift) return 'tda';
        return '';
    },
    'shiftTimeStatus': function(shift) {
        return shift.shiftClockOn ?
             (shift.shiftClockOff ? "glyphicon-check" : "glyphicon-time"): "";
    },
    'splitTimeStatus': function(shift) {
        return shift.splitClockOn ?
             (shift.splitClockOff ? "glyphicon-check" : "glyphicon-time"): "";
    }
});

Template.staffDailyShift.events({
});