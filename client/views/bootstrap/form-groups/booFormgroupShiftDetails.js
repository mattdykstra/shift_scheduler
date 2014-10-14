Template['booFormgroupShiftDetails'].rendered = function () {
    this.$('[name=dayOff]').bootstrapSwitch(
        {
            onText: "OFF",
            offText: "WORK",
            labelText: "day is",
            offColor: "primary",
            onColor: "default"
        }
    );
};

Template['booFormgroupShiftDetails'].helpers({
    'foo': function () {

    }
});

Template['booFormgroupShiftDetails'].events({
    'click .bar': function (e, t) {

    }
});