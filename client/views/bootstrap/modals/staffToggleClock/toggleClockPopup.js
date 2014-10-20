Template['toggleClockPopup'].rendered = function () {
    this.$modal = this.$('#toggle-clock');
    this.$modal.modal({keyboard: true});
    console.log(this.data);
};

Template['toggleClockPopup'].helpers({
    'title': function () {
        return (this.employee ? this.employee.name  : '')
    },
    'hasShift': function(){
        var shift= this.shift;
        return (shift && shift.dayOff != 'on');
    },
    'showShiftOn': function(){
        var shift= this.shift;
        return shift.shiftBegin && shift.shiftEnd && !shift.shiftClockOn;
    },
    'showShiftOff': function(){
        var shift= this.shift;
        return shift.shiftClockOn && !shift.shiftClockOff;
    },

    'showSplitOn': function(){
        var shift= this.shift;
        return shift.splitBegin && shift.splitEnd
            && shift.shiftClockOff && !shift.splitClockOn;
    },
    'showSplitOff': function(){
        var shift= this.shift;
        return shift.splitClockOn && !shift.splitClockOff;
    }
});

function stamp(data) {
    return {
        offset: moment().zone(),
        time: moment().format('h:mm a'),
        shiftId: data.shift ? data.shift._id : ''
        }
}

Template['toggleClockPopup'].events({
    'hidden.bs.modal': function (e, t) {
        Blaze.remove(SH.Modals.toggleClock);
        SH.Modals.toggleClock = null;
    },
    'click .day-off': function (e, t) {
        console.log('day-off clicked');
    },
    'click .shift-on': function (e, t) {
        Meteor.call("shift/clock", _.extend(stamp(t.data), {
            toggle: 'on',
            shift: 'shift'}), function(err, ret){
            console.log(ret);
        });
        t.$modal.modal('hide');
    },
    'click .shift-off': function (e, t) {
        Meteor.call("shift/clock", _.extend(stamp(t.data), {
            toggle: 'off',
            shift: 'shift'}));
        t.$modal.modal('hide');
    },
    'click .split-on': function (e, t) {
        Meteor.call("shift/clock", _.extend(stamp(t.data), {
            toggle: 'on',
            shift: 'split'}            ));
        t.$modal.modal('hide');
    },
    'click .split-off': function (e, t) {
        Meteor.call("shift/clock", _.extend(stamp(t.data), {
            toggle: 'off',
            shift: 'split'}));
        t.$modal.modal('hide');
    }
});