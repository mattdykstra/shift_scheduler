Template.staffEmployeeRow.rendered = function () {

};

function showShiftOn (shift){ // staff has scheduled shift, and no logging yet
    return shift && shift.shiftBegin && !shift.shiftClockOn && shift.dayOff != 'on';
}
function showSplitOn (shift) { // staff has scheduled 2nd shift, 1st shift is logged, and 2nd is not
    return shift && shift.splitBegin && shift.shiftClockOff && !shift.splitClockOn && shift.dayOff != 'on';
}
function getShift(employeeId){
    return SH.Shifts.collection.findOne({
        employeeId: employeeId,
        dayCode: SH.Week.getDayCode(),
        weekCode: SH.Week.getWeekCode()
    });
}

var states = {clockOff: '0', clockOn: '1', actions: '2'};
function getBtnState(employee) {
    if (employee.lastActivity && employee.lastActivity.toggle == 'on') return states.clockOff;
    var shift = getShift(employee._id);
    if (showShiftOn(shift) || showSplitOn(shift)) return states.clockOn;
    return states.actions;
}

Template.staffEmployeeRow.helpers({
    'weeklyTimeTotal': function() {
        var self = this;
        var selector = {
            weekCode: SH.Week.getWeekCode( SH.Week.getString()),
            employeeId: self._id
        };
        return SH.Shifts.employeeWeeklyTime(selector);
    },
    'clockBtnStyle': function(){
        var state = getBtnState(this);
        switch (state){
            case states.clockOn: return 'btn-primary';
            case states.clockOff: return 'btn-warning';
            default: return 'btn-default';
        }
    },
    'clockBtnName': function(){
        var state = getBtnState(this);
        switch (state){
            case states.clockOn: return 'Clock on';
            case states.clockOff: return 'Clock off';
            default: return 'Actions';
        }
    }
});

Template.staffEmployeeRow.events({
    'click .toggle-clock': function (e, t) {
        if (!SH.Modals.toggleClock) {

            SH.Modals.toggleClock = Blaze.renderWithData(
                Template.toggleClockPopup, {
                    shift: getShift(t.data._id),
                    employee: t.data
                },
                $('#modals-container')[0])
        }
    }
});