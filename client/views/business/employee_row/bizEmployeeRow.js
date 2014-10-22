Template.bizEmployeeRow.rendered = function () {
    var self = this;
    Meteor.autorun(function(){
        var timeTotal = 0;
        _.each(self.$('.daily-time-total'), function(item){
          var $item = self.$(item);
          timeTotal += $item.data('timeDaily');
        });
        self.$('.weekly-time').data('weeklyTime', timeTotal);
        self.$('.weekly-time').val(SH.Week.Time.minutesToHmmString(timeTotal));


    })
};

Template.bizEmployeeRow.helpers({
    'weeklyTimeTotal': function(param) {
        var self = this;
        var selector = {
            weekCode: SH.Week.getWeekCode( SH.Week.getString()),
            employeeId: self._id
        };
        return SH.Shifts.employeeWeeklyTime(selector, param=='approved');
    },
    'weeklyPayment': function(param){
        var self = this;
        var selector = {
            weekCode: SH.Week.getWeekCode( SH.Week.getString()),
            employeeId: self._id
        };
        return SH.Shifts.employeeWeeklyPayment(selector, param=='approved');
    }
});

Template.bizEmployeeRow.events({
    'click .edit-staff': function (e, t) {
        if (!SH.Modals.editEmployee) {
            SH.Modals.editEmployee = Blaze.renderWithData(
                Template.booModalEditEmployee,
                t.data,
                $('#modals-container')[0]);
        }
    }
});


