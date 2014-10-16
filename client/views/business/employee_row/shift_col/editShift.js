
Meteor.startup(function(){
    Session.set('businessUserSiteMode', 'scheduling');
});


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
    'shiftCellClass': function(shift) {
        if (!shift) return '';
        var mode = Session.get('businessUserSiteMode');
        if (mode == 'scheduling') {
            if (!shift.staffEdited) return 'shift-cell-green';
            if (shift.staffEdited) return 'shift-cell-orange';
        }
        return '';
    },
    'shiftClass': function(shift) {
        if (!shift) return 'tda';
        return '';
    },
    'display_shift_two': function(shift) {
        return 'sh2_start-sh2_stop ROLE';
    }
});

Template['editShift'].events({
    'click .add-shift-modal-popup': function(e ,t) {
        console.log('here');
        if (!SH.Modals.addShift) {
            SH.Modals.addShift = Blaze.renderWithData(
                Template['booModalAddShift'], t.data, $("#modals-container")[0]);
        }
    },
    'click .edit-shift-modal-popup': function(e ,t) {

        if (!SH.Modals.editShift) {
            var shift = Template['editShift'].__helpers[' shift'].call(t.data);
            console.log(shift);
            if (shift) {
                SH.Modals.editShift = Blaze.renderWithData(
                    Template['booModalEditShift'], shift, $("#modals-container")[0]);
            }
        }
    }
});