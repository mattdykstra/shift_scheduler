Template.booFormgroupShiftApprovalDetails.rendered = function () {
    this.$dayOff = this.$('[name=dayOff]');
    this.$dayOff.bootstrapSwitch(
        {
            onText: "OFF",
            offText: "WORK",
            labelText: "day is",
            offColor: "primary",
            onColor: "default"
        }
    );
};

Template.booFormgroupShiftApprovalDetails.helpers({
    '_shiftBeginReal': function () {
        return this.shiftBeginReal || this.shiftBegin;
    },
    '_shiftEndReal': function () {
        return this.shiftEndReal || this.shiftEnd;
    },
    '_splitBeginReal': function () {
        return this.splitBeginReal || this.splitBegin;
    },
    '_splitEndReal': function () {
        return this.splitEndReal || this.splitEnd;
    }
});

Template.booFormgroupShiftApprovalDetails.events({
    'click .bar': function (e, t) {

    }
});