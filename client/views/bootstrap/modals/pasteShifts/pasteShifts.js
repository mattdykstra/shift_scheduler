Template.pasteShifts.rendered = function () {
    this.$modal = this.$(".modal");
    this.$modal.modal('show');
};

Template.pasteShifts.helpers({
    'copyFromWeek': function(){
        return Session.get('shCopyFromWeek');
    },
    'dataHelper': function(){
        var self = this;
        return {
            modalId: 'paste-shifts',
            form: {
                title: function () {
                    return 'Paste shifts'
                },
                class: "form-vertical"
            },
            cancelButton: 'Cancel',
            applyButton: 'Paste',
            data: {}
        }
    }
});

Template.pasteShifts.events({
    'hidden.bs.modal': function (e, t) {
        Blaze.remove(SH.Modals.pasteShifts);
        SH.Modals.pasteShifts = null;
    },
    'click .submit': function (e, t) {
        var employeeId= t.$('[name=employeeId]').val();
        console.log(employeeId);
         if (SH.isBusinessUser()) {
            Meteor.call('shifts/paste',  SH.Week.getWeekCode (Session.get("shCopyFromWeek")),  SH.Week.getWeekCode(SH.Week.getString()), employeeId);
         }
        t.$modal.modal('hide');
    }
});