Template.switchApproveSchedule.rendered = function () {
    this.$checkbox = this.$('#approval_mode');
    this.$checkbox.bootstrapSwitch({
        onText: "APPROVAL",
        offText: "SCHEDULE",
        labelText: "mode is",
        offColor: "primary",
        onColor: "warning"
    });
};

Template.switchApproveSchedule.events({
    'click .widget_container_outer': function(e, t) {
        Session.set('isInApprovalMode', t.$checkbox.is(':checked'));

    }
});


Blaze.registerHelper('isInApprovalMode', function(){
    return Session.get('isInApprovalMode');
});
