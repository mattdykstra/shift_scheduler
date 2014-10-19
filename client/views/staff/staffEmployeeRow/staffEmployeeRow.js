Template['staffEmployeeRow'].rendered = function () {

};

Template['staffEmployeeRow'].helpers({
    'weeklyTimeTotal': function() {
        var self = this;
        var selector = {
            weekCode: SH.Week.getWeekCode( SH.Week.getString()),
            employeeId: self._id
        };
        return SH.Shifts.employeeWeeklyTime(selector);
    }
});

Template['staffEmployeeRow'].events({
    'click .toggle-clock': function (e, t) {
        var $link = $(e.currentTarget);

        if (!SH.Modals.toggleClock) {
            console.log("here");
            SH.Modals.toggleClock = Blaze.renderWithData(
                Template['toggleClockPopup'], {
                    shifts: SH.Shifts.collection.find({employeeId: t.data._id}).fetch(),
                    employee: t.data,
                    dayCode: $link.data('dayCode')},
                $('#modals-container')[0])
        }
    }
});