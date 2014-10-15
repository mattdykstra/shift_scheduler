Template['add_business'].rendered = function () {
    this.$form = this.$("#add-business-form");
    this.parsley = this.$form.parsley({trigger: "blur"});
    this.$modal = this.$('#add-business');
    this.$modal.modal('show');
};

Template['add_business'].helpers({
    'defaultValues' : function(){
        return {isActive: 'on'};
    }
});

Template['add_business'].events({
    'shown.bs.modal': function (e, t) {
        t.$('input[name=email]').focus()
    },
    'hidden.bs.modal': function (e, t) {
        Blaze.remove(SH.Modals.addBusiness);
        SH.Modals.addBusiness = null;
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
        console.log(newbie);
        Meteor.call("users/claim", newbie.email, "business", _.omit(newbie, ['email']), function(err, ret){
            if (ret=="success") {
                t.$modal.modal('hide');
                t.$form.trigger('reset');
            }
            if (ret=="email exists") {
                alert("this email is already registered. going to add this check to ui validation asap");
            }
        });
        t.$modal.modal('hide');
    }

});