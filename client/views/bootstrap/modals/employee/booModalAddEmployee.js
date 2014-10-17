Template['booModalAddEmployee'].rendered = function () {
    this.$form = this.$("#add-employee-form");
    this.parsley = this.$form.parsley({trigger: "blur"});
    this.$modal = this.$('#add-employee');

    this.$modal.modal('show');
};

Template['booModalAddEmployee'].helpers({
    'foo': function () {

    }
});

Template['booModalAddEmployee'].events({
    'hidden.bs.modal': function (e, t) {
        Blaze.remove(SH.Modals.addEmployee);
        SH.Modals.addEmployee = null;
    },
    'show.bs.modal': function (e, t) {

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
        SH.Collections.Staff.insert (newbie);
        t.$modal.modal('hide');
    }
});