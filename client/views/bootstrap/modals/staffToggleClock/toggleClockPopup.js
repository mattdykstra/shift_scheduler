Template['toggleClockPopup'].rendered = function () {
    this.$modal = this.$('#toggle-clock');
    this.$modal.modal('show');
    console.log(this.data);
};

Template['toggleClockPopup'].helpers({
    'title': function () {
        return (this.employee ? this.employee.name  : '')
    },
    'showShiftOn': function(){
        return true;
    },
    'showShiftOff': function(){
        return false;
    },
    'showSplitOn': function(){
        return false;
    },
    'showSplitOff': function(){
        return true;
    }
});

Template['toggleClockPopup'].events({
    'hidden.bs.modal': function (e, t) {
        Blaze.remove(SH.Modals.toggleClock);
        SH.Modals.toggleClock = null;
    },
    'click .day-off': function (e, t) {
        console.log('day-off clicked');
    },
    'click .shift-on': function (e, t) {
        console.log('shift-on clicked');
    },
    'click .shift-off': function (e, t) {
        console.log('shift-off clicked');
    },
    'click .split-on': function (e, t) {
        console.log('split-on clicked');
    },
    'click .split-off': function (e, t) {
        console.log('split-off clicked');
    }
});