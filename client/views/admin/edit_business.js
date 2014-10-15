Template['edit_business'].rendered = function () {
    this.$form = this.$("#edit-business-form");
    this.parsley = this.$form.parsley({trigger: "blur"});
    this.$modal = this.$('#edit-business');
    this.$modal.modal('show');
};

Template['edit_business'].helpers({
    'thisDisabledEmail': function () {
        return _.extend(this, {disableEmail: true})
    }
});

Template['edit_business'].events({
    'hidden.bs.modal': function (e, t) {
        Blaze.remove(SH.Modals.editBusiness);
        SH.Modals.editBusiness = null;
    },
    'keyup': function (e, t) {
        if (e.key == 'Esc') {
            t.$('.dropdown.open').removeClass('open');
        }
    },
    'click .submit': function (e, t) {
        e.preventDefault();
        e.stopPropagation();
        t.parsley.validate();
        if (!t.parsley.isValid()) return;
        var newbie = {};
        t.$form.serializeArray().forEach(function (input) {
            newbie[input.name] = input.value;
            if (!newbie.isActive) newbie.isActive='off';
        });
        Meteor.users.update({_id: t.data._id}, {$set: newbie});
        console.log('here');
        t.$modal.modal('hide');
    }
});