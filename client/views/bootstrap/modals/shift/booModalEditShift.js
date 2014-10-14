Template['booModalEditShift'].rendered = function () {

};

Template['booModalEditShift'].helpers({
    'employee_name': function () {
        var employee = SH.Shifts.collection.findOne({_id: this.employeeId});
        if (employee) return employee.name;
        return '###';
    }
});

Template['booModalEditShift'].events({
    'click .bar': function (e, t) {

    }
});