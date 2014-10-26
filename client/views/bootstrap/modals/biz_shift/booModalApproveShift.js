Template.booModalApproveShift.rendered = function () {
    this.$form = this.$("#approve-shift-form");
    this.parsley = this.$form.parsley({trigger: "blur", excluded: "input[type=checkbox]"
    });
    this.$modal = this.$('#approve-shift');
    this.$modal.modal('show');
    this.alertsRoot = this.$(".alerts-container")[0];
};

Template.booModalApproveShift.helpers({
    'dataHelper': function(){
        var self = this;
        return {
            modalId: 'approve-shift',
            form: {
                title: function () {
                    return "Schedule for " +
                        Blaze._globalHelpers['EmployeeName'](self.employeeId)
                        + " on " +
                        Blaze._globalHelpers['thDateFromDayCode'](self.dayCode);
                },
                class: "form-vertical"
            },
            cancelButton: 'Cancel',
            applyButton: 'Save',
            data: self
        }
    }
});

Template.booModalApproveShift.events({
    'hidden.bs.modal': function (e, t) {
        Blaze.remove(SH.Modals.editShift);
        SH.Modals.editShift = null;
    },
    'click .submit': function (e, t) {
        e.preventDefault();
        e.stopPropagation();

        t.parsley.validate();
        if (!t.parsley.isValid()) {
            Blaze.renderWithData(Template.alert, {
                message: "form validation failure",
                status: 'info'
            }, t.alertsRoot);
            return;
        }

        var newbie = {};
        t.$form.serializeArray().forEach(function (input) {
            newbie[input.name] = input.value;
        });

        //todo: this also should happen on server.
        if (!newbie.dayOff)
            newbie.dayOff = 'off';

        SH.Shifts.collection.update({_id: t.data._id}, {$set: newbie});
        t.$modal.modal('hide');
    }
});