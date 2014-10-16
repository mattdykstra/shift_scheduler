Template['booModalEditShift'].rendered = function () {

};

Template['booModalEditShift'].helpers({
    'dataHelper': function(){
        var self = this;
        return {
            modalId: 'edit-shift',
            form: {
                title: new Blaze.View('modalEditShiftTilte', function() {
                    return "Schedule for " +
                        Blaze._globalHelpers['EmployeeName'](self.employeeId)
                        + " on " +
                        Blaze._globalHelpers['thDateFromDayCode'](self.dayCode);
                }),
                class: "form-horizontal"
            },
            cancelButton: 'Cancel',
            applyButton: 'Save'
        }
    }
});

Template['booModalEditShift'].events({
    'click .bar': function (e, t) {

    }
});