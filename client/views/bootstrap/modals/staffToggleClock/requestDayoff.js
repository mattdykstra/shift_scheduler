Template.requestDayoff.rendered = function () {
    this.dp1 = this.$('#dp1').datetimepicker();
    this.dp2 = this.$('#dp2').datetimepicker();
    this.$dayfirst = this.$('#dp1 input');
    this.$daylast = this.$('#dp2 input');
};

Template.requestDayoff.destroyed = function () {
    Session.set('shVacationPickerActivated', null);
};

Template.requestDayoff.helpers({
    'secondPickerDisabled': function () {
        console.log(Session.get('shVacationPickerActivated'));
        return !Session.get('shVacationPickerActivated');
    }
});

Template.requestDayoff.events({
    "dp.change #dp1": function (e, t) {
        var val=t.$dayfirst.val();
        if (val) {
            Session.set('shVacationPickerActivated', true);
            t.dp2.data("DateTimePicker").setMinDate(e.date);//.data("DateTimePicker").setDate("");
        }
        else {
            Session.set('shVacationPickerActivated', null);
        }
    },
    'click .action-request': function (e, t){
        var st1 = t.$dayfirst.val();
        var nd2 = t.$daylast.val();
        console.log(st1 );
        console.log(nd2 );//
        Meteor.call("shifts/request/dayoff", t.data._id,//employeeId
        st1, nd2);// first day, last day if any
    }
});