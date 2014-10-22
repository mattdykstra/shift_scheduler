Template.bizSettings.rendered = function () {
    this.$modal = this.$('.modal');
    this.$modal.modal('show');
};

Template.bizSettings.helpers({

});

Template.bizSettings.events({
    'hidden.bs.modal': function (e, t) {
        Blaze.remove(SH.Modals.settings);
        SH.Modals.settings = null;
    }
});