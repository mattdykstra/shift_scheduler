Template.tdShift.helpers({
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
            Blaze._globalHelpers['dailyTimeTotal'](shift), true  ); //todo: refactor into SH.Shifts....
    },
    'shiftClass': function(shift) {
        if (!shift) return 'tda';
        return '';
    }
});

Template.tdShift.events({
    'click .add-shift-modal-popup': function(e ,t) {
        if (!SH.Modals.addShift) {
            SH.Modals.addShift = Blaze.renderWithData(
                Template.booModalAddShift, t.data, $("#modals-container")[0]);
        }
    },
    'click .edit-shift-modal-popup': function(e ,t) {
        if (!SH.Modals.editShift) {
            var shift = Template.tdShift.__helpers[' shift'].call(t.data);
            if (shift) {
                SH.Modals.editShift = Blaze.renderWithData(
                    Template.booModalEditShift, shift, $("#modals-container")[0]);
            }
        }
    }
});