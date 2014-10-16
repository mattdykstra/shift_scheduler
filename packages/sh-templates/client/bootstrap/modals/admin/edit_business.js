Template['edit_business'].rendered = function () {
    this.$form = this.$("#edit-business-form");
    this.parsley = this.$form.parsley({trigger: "blur", excluded: "input[type=checkbox]"});
    this.$modal = this.$('#edit-business');
    this.$modal.modal('show');
};

Template['edit_business'].helpers({
    'dataHelper': function(){
        var self = this;
        return {
            modalId: 'edit-business',
            form: {
                title: function () {
                    return 'Edit account details: ' + (self.emails ? self.emails[0].address: "###");
                },
                class: "form-vertical"
            },
            cancelButton: 'Cancel',
            applyButton: 'Add',
            data: _.extend(self, {disableEmail: true})
        }
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
        });
        if (!newbie.isActive) newbie.isActive='off';
        Meteor.users.update({_id: t.data._id}, {$set: newbie});
        t.$modal.modal('hide');
    }
});