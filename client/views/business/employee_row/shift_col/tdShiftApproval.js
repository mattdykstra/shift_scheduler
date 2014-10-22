Template.tdShiftApproval.helpers({
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
            Blaze._globalHelpers['dailyTimeTotalReal'](shift) ); //todo: refactor into SH.Shifts....
    },
    'shiftCellClass': function(shift) {
        if (!shift) return '';
        if (shift.shiftStatus == SH.Shifts.status.LATE ||
            shift.splitStatus == SH.Shifts.status.LATE) return 'shift-cell-red';
        if (shift.shiftStatus == SH.Shifts.status.PENDING||
            shift.splitStatus == SH.Shifts.status.PENDING) return 'shift-cell-orange';
        return 'shift-cell-green';

    },
    'shiftClass': function(shift) {
        if (!shift) return 'tda';
        return '';
    }
});

Template.tdShiftApproval.events({
    'click .edit-shift-modal-popup': function(e ,t) {
        if (!SH.Modals.editShift) {
            var shift = Template.tdShift.__helpers[' shift'].call(t.data);
            if (shift) {
                SH.Modals.editShift = Blaze.renderWithData(
                    Template.booModalApproveShift, shift, $("#modals-container")[0]);
            }
        }
    }
});