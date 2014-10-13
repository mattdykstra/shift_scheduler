Template['booModalEditEmployee'].rendered = function () {
    this.$hourly = this.$("input[name=hourly_rate]");
    this.$salary = this.$("input[name=salary]");
    this.$form = this.$("form");
    this.parsley = this.$form.parsley({trigger: "blur"});
    this.$modal = this.$('.modal');
    this.alertsRoot = this.$(".alerts-container")[0];
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
        t.parsley.reset();
        t.$form.trigger('reset');
    },
    'click .submit': function (e, t) {
       e.preventDefault();
        e.stopPropagation();
        console.log('d');
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
        SH.Collections.Staff.update({_id: t.data._id}, newbie);
        t.$modal.modal('hide');
    }
});