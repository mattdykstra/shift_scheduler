Template['booModalAddShift'].rendered = function () {
    this.$form = this.$("#add-shift-form");
    this.$modal = this.$('#add-shift');
    this.parsley = this.$form.parsley({
        trigger: 'change'
    });
    this.$modal.modal({backdrop: 'static'});
};

Template['booModalAddShift'].helpers({

});

Template['booModalAddShift'].events({
    'hidden.bs.modal': function (e, t) {
        Blaze.remove(SH.Modals.addShift);
        SH.Modals.addShift = null;
    },

    'click .submit': function (e, t) {
        e.preventDefault();
        e.stopPropagation();

        t.parsley.validate();
        console.log(t.parsley.isValid());
        if (!t.parsley.isValid()) {
            Blaze.renderWithData(Template['alert'], {
                message: "form validation failure",
                status: 'info'
            }, t.alertsRoot);
            return;
        }

        var newbie = {};
        t.$form.serializeArray().forEach(function (input) {
            if (input.value)
            newbie[input.name] = input.value;
        });
        console.log( SH.Week.Time.spanInMinutes( newbie.shiftBegin, newbie.shiftEnd ) );
        console.log(newbie);
        t.$modal.modal('hide');
    }
});