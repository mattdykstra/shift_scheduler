Template['booModalEditEmployee'].rendered = function () {
    this.$form = this.$("form");
    this.$modal = this.$('.modal');

    this.$hourly = this.$("input[name=hourly_rate]");
    this.$salary = this.$("input[name=salary]");

    this.alertsRoot = this.$(".alerts-container")[0];
    this.parsley = this.$form.parsley({trigger: "blur"});


    this.$modal.modal('show');
};

Template['booModalEditEmployee'].helpers({
    'foo': function () {

    }
});

Template['booModalEditEmployee'].events({
    'show.bs.modal': function (e, t) {
        KL.Utils.Meteor._sessionSetTrueIfNonEmpty(t, '$hourly', 'hourlyIsSet');
        KL.Utils.Meteor._sessionSetTrueIfNonEmpty(t, '$salary', 'salaryIsSet');
    },
    'hidden.bs.modal': function (e, t) {
        Blaze.remove(SH.Modals.editEmployee);
        SH.Modals.editEmployee = null;
        Session.set("hourlyIsSet", null);
        Session.set("salaryIsSet", null);
    },
    'click .submit': function (e, t) {
        e.preventDefault();
        e.stopPropagation();
        console.log('d');
        t.parsley.validate();
        if (!t.parsley.isValid()) {
            Blaze.renderWithData(Template['alert'], {
                message: "form validation failure",
                status: 'info'
            }, t.alertsRoot);
            return;
        }
        console.log('h');
        var newbie = {};
        t.$form.serializeArray().forEach(function (input) {
            newbie[input.name] = input.value;
        });
        console.log(newbie);
        SH.Collections.Staff.update({_id: t.data._id}, {$set: newbie} );
        t.$modal.modal('hide');
    }
});