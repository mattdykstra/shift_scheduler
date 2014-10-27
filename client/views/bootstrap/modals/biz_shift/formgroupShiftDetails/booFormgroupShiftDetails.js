Template.booFormgroupShiftDetails.rendered = function () {
    this.$dayOff = this.$('[name=dayOff]');
    this.$unpublished = this.$('[name=publish]');
    this.$shiftRole = this.$('[name=shiftRole]');
    this.$splitRole = this.$('[name=splitRole]');

    this.$dayOff.bootstrapSwitch(
        {
            onText: "OFF",
            offText: "WORK",
            labelText: "day is",
            offColor: "primary",
            onColor: "default"
        }
    );

    this.$unpublished.bootstrapSwitch(
        {
            onText: "yes",
            offText: "no",
            labelText: "publish",
            offColor: "primary",
            onColor: "success"
        }
    );

    Session.set('shiftDayOff', this.$dayOff.val()=='on');
    Session.set('unpublished', this.$unpublished.val()=='on');
    Session.set('shiftRoleEmpty', this.$shiftRole.val() == "");
    Session.set('splitRoleEmpty', this.$splitRole.val() == "");
};

Template.booFormgroupShiftDetails.helpers({
    'disabledOnDayOff': function () {
        return Session.get('shiftDayOff') ? 'disabled' : '';
    },
    'isDayOff': function() {
        return Session.get('shiftDayOff');
    },
    shiftRoleNotEmpty: function () {
        return !Session.get('shiftRoleEmpty')
    },
    splitRoleNotEmpty: function () {
        return !Session.get('splitRoleEmpty')
    },
    'canDeleteShift': function() {
        return (!(this.shiftClockOn || this.shiftClockOff || this.splitClockOn  || this.splitClockOff ))
            && this._id;
    }
});

Template.booFormgroupShiftDetails.destroyed = function(){
    Session.set('shiftDayOff',null);
    Session.set('unpublished', null);
    Session.set('shiftRoleEmpty', null);
    Session.set('splitRoleEmpty', null);
};

Template.booFormgroupShiftDetails.events({
    'change .dayOff': function (e, t) {
        Session.set('shiftDayOff', t.$dayOff.val()=='on');
    },
    'change [name=\"shiftRole\"]': function(e, t) {
        Session.set('shiftRoleEmpty',  t.$shiftRole.val() == "");
    },
    'change [name=\"splitRole\"]': function(e, t) {
        Session.set('splitRoleEmpty',  t.$splitRole.val() == "");
    }
});