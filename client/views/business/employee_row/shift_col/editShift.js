
Template['editShift'].rendered = function () {

};

Template['editShift'].helpers({
    'shift': function() {
        var selector = _.pick(this, ['dayCode', 'employeeId']);
        _.extend( selector, {
            weekCode: SH.Week.getWeekCode(SH.Week.getString() ),
            businessId: SH.businessId(),
            tag: {$exists: false}
        });

        return SH.Shifts.collection.findOne(selector);
    },
    'dailyTimeTotal': function (shift) {

        if (!shift) return "()";

        return '0:00';
    },
    'shiftClass': function(shift) {

        return 'tda'
    },
    'foo': function(params){
        return Template['editShift'].shift();
    },
    'display_shift_one': function(shift) {
        return 'sh1_start-sh1_stop ROLE';
    },
    'display_shift_two': function(shift) {
        return 'sh2_start-sh2_stop ROLE';
    }
});

Template['editShift'].events({
    'click .edit-shift-modal-popup': function(e ,t) {
        if (!SH.Modals.edit) {
            var shift = Template['editShift'].__helpers[' shift'].call(t.data);
            if (shift) {
                SH.Modals.editShift = Blaze.renderWithData(
                    Template['booModalEditShift'], shift, $("#modals-container")[0]);
            }
            else {

                SH.Modals.addShift = Blaze.renderWithData(
                    Template['booModalAddShift'], t.data, $("#modals-container")[0]);

            }
        }
    }
});