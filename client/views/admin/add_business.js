Template['add_business'].rendered = function () {
    this.$form = this.$("#add-business-form");
    this.parsley = this.$form.parsley({trigger: "blur"});
    this.$modal = this.$('#add-business');
};

Template['add_business'].helpers({

});

Template['add_business'].events({
    'shown.bs.modal': function (e, t) {
        t.$('input[name=email]').focus()
    },
    'keyup': function (e, t) {
        if (e.key == 'Esc') {
            t.$('.dropdown.open').removeClass('open');
        }
    },
    'click .submit': function (e, t) {
        e.preventDefault();
        e.stopPropagation();
        if (!t.parsley.isValid()) return;
        var newbie = {};
        t.$form.serializeArray().forEach(function (input) {
            newbie[input.name] = input.value;
        });
        Meteor.call("users/claim", newbie.email, "business", _.omit(newbie, ['email']), function(err, ret){
            if (ret=="success") {
                t.$modal.modal('hide');
                t.$form.trigger('reset');
            }
            if (ret=="email exists") {
                alert("this email is already registered. going to add this check to ui validation asap");
            }
        });
    }
});