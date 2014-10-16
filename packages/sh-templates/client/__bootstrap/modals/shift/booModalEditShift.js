Template['booModalEditShift'].rendered = function () {
    this.$form = this.$("#edit-shift-form");
    this.parsley = this.$form.parsley({trigger: "blur", excluded: "input[type=checkbox]"
    });
    this.$modal = this.$('#edit-shift');
    this.$modal.modal('show');
    this.alertsRoot = this.$(".alerts-container")[0];
};

Template['booModalEditShift'].helpers({
    'dataHelper': function(){
        var self = this;
        return {
            modalId: 'edit-shift',
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

Template['booModalEditShift'].events({
    'hidden.bs.modal': function (e, t) {
        Blaze.remove(SH.Modals.editShift);
        SH.Modals.editShift = null;
    },

    'click .submit': function (e, t) {
        e.preventDefault();
        e.stopPropagation();

        t.parsley.validate();
        console.log(t.parsley.isValid());
        if (!t.parsley.isValid()) {
            Blaze.renderWithData(Template['alert'], {
                message: "form validation failure",
                status: 'info',
                dismissible: true
            }, t.alertsRoot);
            return;
        }

        var newbie = {};
        t.$form.serializeArray().forEach(function (input) {
            if (input.value)
                newbie[input.name] = input.value;
        });
        console.log( newbie );
        if (!newbie.dayOff) newbie.dayOff = 'off';

        console.log(newbie);
        console.log(t.data._id);
        SH.Shifts.collection.update({_id: t.data._id}, {$set: newbie});
        t.$modal.modal('hide');
    }
});