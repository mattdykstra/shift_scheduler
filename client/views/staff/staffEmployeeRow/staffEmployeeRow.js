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
            console.log({
                employeeId: t.data._id,
                dayCode: SH.Week.getDayCode(),
                weekCode: SH.Week.getWeekCode()
            });

            SH.Modals.toggleClock = Blaze.renderWithData(
                Template['toggleClockPopup'], {
                    shift: SH.Shifts.collection.findOne({
                        employeeId: t.data._id,
                        dayCode: SH.Week.getDayCode(),
                        weekCode: SH.Week.getWeekCode()
                    }),
                    employee: t.data
                },
                $('#modals-container')[0])
        }
    }
});