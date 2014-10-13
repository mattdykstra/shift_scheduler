Template['booModalAddEmployee'].rendered = function () {
    this.$form = this.$("#add-employee-form");
    this.parsley = this.$form.parsley({trigger: "blur"});
    this.$modal = this.$('#add-employee');
};

Template['booModalAddEmployee'].helpers({
    'foo': function () {

    }
});

Template['booModalAddEmployee'].events({
    'click .submit': function (e, t) {

        e.preventDefault();
        e.stopPropagation();
        if (!t.parsley.isValid()) return;
        var newbie = {};
        t.$form.serializeArray().forEach(function (input) {
            newbie[input.name] = input.value;
        });

        SH.Collections.Staff.insert (newbie);
        t.$modal.modal('hide');
        t.$form.trigger('reset');
        t.parsley(reset);
        Session.set("hourlyIsSet", null);
        Session.set("salaryIsSet", null);
    }
});