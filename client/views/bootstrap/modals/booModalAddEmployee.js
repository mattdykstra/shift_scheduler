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
    'hidden.bs.modal': function (e, t) {
        t.$form.trigger('reset');

       // t.parsley = t.$form.parsley({trigger: "blur"});
        t.parsley.reset();
        // - would need this once we use only 1 modal and render it with data..
        // t.$form.trigger('reset');
    },
    'show.bs.modal': function (e, t) {
        Session.set("hourlyIsSet", null);
        Session.set("salaryIsSet", null);
    },
    'click .submit': function (e, t) {
        e.preventDefault();
        e.stopPropagation();
        t.parsley.validate();
        if (!t.parsley.isValid()) return;
        var newbie = {};
        t.$form.serializeArray().forEach(function (input) {
            newbie[input.name] = input.value;
        });
console.log(newbie);
        SH.Collections.Staff.insert (newbie);
        t.$modal.modal('hide');
        Session.set("hourlyIsSet", null);
        Session.set("salaryIsSet", null);
    }
});