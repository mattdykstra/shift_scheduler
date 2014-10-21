Template.booModalAddShift.rendered = function () {
    this.$form = this.$("#add-shift-form");
    this.$modal = this.$('#add-shift');
    this.parsley = this.$form.parsley({
        trigger: 'change'
    });
    this.alertsRoot = this.$(".alerts-container")[0];
    this.$modal.modal({backdrop: 'static'});
};

Template.booModalAddShift.helpers({

});

Template.booModalAddShift.events({
    'hidden.bs.modal': function (e, t) {
        Blaze.remove(SH.Modals.addShift);
        SH.Modals.addShift = null;
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

        if (!newbie.dayOff)
            newbie.dayOff = 'off';
        if (!(newbie.shiftBegin || newbie.shiftEnd || newbie.splitBegin || newbie.splitEnd))
            newbie.dayOff = 'on';
        _.extend(newbie, {
            employeeId: t.data.employeeId,
            dayCode: t.data.dayCode.toString(),
            weekCode: SH.Week.getWeekCode( SH.Week.getString() )
        });
        SH.Shifts.collection.insert(newbie);
        t.$modal.modal('hide');
    }
});