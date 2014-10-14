Template['booModalAddShift'].rendered = function () {
    this.$form = this.$("#add-shift-form");
    this.$modal = this.$('#add-shift');

    this.$modal.modal('show');
};

Template['booModalAddShift'].helpers({
    'employee_name': function () {
        var employee = SH.Shifts.collection.findOne({_id: this.employeeId});
        if (employee) return employee.name;
        return '###';
    }
});

Template['booModalAddShift'].events({
    'hidden.bs.modal': function (e, t) {
        Blaze.remove(SH.Modals.addShift);
        SH.Modals.addShift = null;
    },

    'click .submit': function (e, t) {
        e.preventDefault();
        e.stopPropagation();

        var newbie = {};
        t.$form.serializeArray().forEach(function (input) {
            newbie[input.name] = input.value;
        });
        console.log(newbie);
        t.$modal.modal('hide');
    }
});