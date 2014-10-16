Template['booFormgroupShiftDetails'].rendered = function () {
    this.$dayOff = this.$('[name=dayOff]');
    this.$shiftBegin = this.$('[name=shiftBegin]');
    this.$splitBegin = this.$('[name=splitBegin]');
    this.$dayOff.bootstrapSwitch(
        {
            onText: "OFF",
            offText: "WORK",
            labelText: "day is",
            offColor: "primary",
            onColor: "default"
        }
    );
    Session.set('shiftDayOff', this.$dayOff.val()=='on');
    Session.set('shiftBeginEmpty', this.$shiftBegin.val() == "");
    Session.set('splitBeginEmpty', this.$splitBegin.val() == "");
};

Template['booFormgroupShiftDetails'].helpers({
    'disabledOnDayOff': function () {
        return Session.get('shiftDayOff') ? 'disabled' : '';
    },
    'isDayOff': function() {
        return Session.get('shiftDayOff');
    },
    shiftBeginEmpty: function () {
        console.log(Session.get('shiftBeginEmpty'));
        return Session.get('shiftBeginEmpty')
    },
    splitBeginEmpty: function () {
        console.log(Session.get('splitBeginEmpty'));
        return Session.get('splitBeginEmpty')
    }
});

Template['booFormgroupShiftDetails'].destroyed = function(){
    Session.set('shiftDayOff',null);
    Session.set('shiftBeginEmpty', null);
    Session.set('splitBeginEmpty', null);
};

Template['booFormgroupShiftDetails'].events({
    'change .dayOff': function (e, t) {
        Session.set('shiftDayOff', t.$dayOff.val()=='on');
    },
});