Template.booFormgroupEmployeeDetails.destroyed = function () {
    Session.set("hourlyIsSet", null);
    Session.set("salaryIsSet", null);
};

Template.booFormgroupEmployeeDetails.rendered = function () {
    this.$hourly = this.$("input[name=hourly_rate]");
    this.$salary = this.$("input[name=salary]");
    if (!this.data) return;
    if (this.data.hourly_rate || this.$hourly.val()) {
        Session.set("hourlyIsSet", true)
    }
    if (this.data.salary || this.$salary.val()) {
        Session.set("salaryIsSet", true)
    }
};

Template.booFormgroupEmployeeDetails.helpers({
    'Coeff_mon_fri': function () {
        return this.coeff_mon_fri || '1.25'
    },
    'Coeff_sat': function () {
        return this.coeff_sat || '1.5'
    },
    'Coeff_sun': function () {
        return this.coeff_sat || '1.5'
    },
    disableIfHourly: function(){
        return Session.get( "hourlyIsSet" ) ? "disabled":'';
    },
    disableIfSalary: function(){
        return Session.get( "salaryIsSet" ) ? "disabled":"";
    },
    visibleIfHourly: function(){
        return Session.get( "hourlyIsSet" ) ? "" : "hidden";
    }
});

Template.booFormgroupEmployeeDetails.events({
    'change [name=hourly_rate]': function (e, t) {
        KL.Utils.Meteor._sessionSetTrueIfNonEmpty(t, '$hourly', 'hourlyIsSet')
    },
    'keyup [name=hourly_rate]': function (e, t) {
        KL.Utils.Meteor._sessionSetTrueIfNonEmpty(t, '$hourly', 'hourlyIsSet')
    },

    'change [name=salary]': function (e, t) {
        KL.Utils.Meteor._sessionSetTrueIfNonEmpty(t, '$salary', 'salaryIsSet')
    },
    'keyup [name=salary]': function (e, t) {
        KL.Utils.Meteor._sessionSetTrueIfNonEmpty(t, '$salary', 'salaryIsSet')
    }
});