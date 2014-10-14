Template['bizEmployeeRow'].rendered = function () {

};

Template['bizEmployeeRow'].helpers({

});

Template['bizEmployeeRow'].events({
    'click .edit': function (e, t) {

    },
    'click .edit-staff': function (e, t) {
        if (!SH.Modals.editEmployee) {
            SH.Modals.editEmployee = Blaze.renderWithData(
                Template['booModalEditEmployee'],
                t.data,
                $('#modals-container')[0]);
        }
    }
});
