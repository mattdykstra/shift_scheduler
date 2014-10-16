Template['bizEmployeeRow'].rendered = function () {
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


var sum = function sum(collection, fnTransform){
    return _.reduce(collection, function(memo, num){
        return memo + (fnTransform ? fnTransform(num) : num);
    }, 0);
};

Template['bizEmployeeRow'].helpers({
    'weeklyTimeTotal': function() {
        var self = this;
        var selector = {
            weekCode: SH.Week.getWeekCode( SH.Week.getString()),
            employeeId: self._id
        };
        var shifts = SH.Shifts.collection.find(selector).fetch();

        return shifts ?
            SH.Week.Time.minutesToHmmString (sum(shifts, function(shift) {
            return Blaze._globalHelpers['dailyTimeTotal'](shift);
        })) : 0;
    },
    'weeklyPaymentTotal': function(){
        var self = this;
        var employee = SH.Staff.collection.findOne({_id: self._id});
        if (!employee) return 0;
        if (employee.salary) return Math.round(employee.salary / 52);
        if (employee.hourly_rate) {
            var selector = {
                weekCode: SH.Week.getWeekCode( SH.Week.getString()),
                employeeId: self._id
            };

            var shifts =  SH.Shifts.collection.find(selector).fetch();
            return Math.round ( shifts ? ( employee.hourly_rate *
                sum(shifts, function(shift) {
                    var time = Blaze._globalHelpers['dailyTimeTotal'](shift);
                    if (shift.dayCode == '6') return (time / 60) * employee.coeff_sat;
                    if (shift.dayCode == '7') return (time / 60) * employee.coeff_sun;
                    return (time / 60) * employee.coeff_mon_fri;
                }) )
                : 0 );
        }
    }

});

Template['bizEmployeeRow'].events({
    'click .edit': function (e, t) {

    },
    'click .edit-staff': function (e, t) {
        if (!SH.Modals.editEmployee) {
            SH.Modals.editEmployee = Blaze.renderWithData(
                Template['booModalEditEmployee'],
                t.data,
                $('#modals-container')[0]);
        }
    }
});


Template['bizrowWeeklyTime'].helpers({
    'calc': function(){

    }
});


