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
        var oranges = [SH.Shifts.status.LATE,  SH.Shifts.status.PENDING];
        if (!shift) return '';

        if ((shift.shiftStatus && oranges.indexOf(shift.shiftStatus) >-1)
           ||(shift.splitStatus && oranges.indexOf(shift.splitStatus ) >-1 ))return 'shift-cell-orange';
        return 'shift-cell-green';
    },
    'shiftClass': function(shift) {
        if (!shift) return 'tda';
        return '';
    }
});

Template.staffDailyShift.events({
});