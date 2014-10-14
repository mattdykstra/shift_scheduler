Template['bizEmployeeRow'].rendered = function () {

};

Template['bizEmployeeRow'].helpers({
    'dailyTimeTotal': function (params) {
        var dayCode = params.hash.dayCode;
        var employeeId = params.hash.employeeId;

        return ''
    },
    'shiftClass': function(params) {
        var dayCode = params.hash.dayCode;
        var employeeId = params.hash.employeeId;

        return ''
    }
});

Template['bizEmployeeRow'].events({
    'click .edit': function (e, t) {

    }
});