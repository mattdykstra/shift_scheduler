SH.Shifts.employeeWeeklyTime= function employeeWeeklyTime(selector){
    //todo: check selector has employeeId && weekCode, pick only those.
    var shifts = SH.Shifts.collection.find(selector).fetch();
    return shifts ?
        SH.Week.Time.minutesToHmmString (KL.Utils.sum(shifts, function(shift) {
            return Blaze._globalHelpers['dailyTimeTotal'](shift);
        })) : 0;
};

SH.Shifts.employeeWeeklyPayment= function employeeWeeklyPayment(selector){
    //todo: check selector has employeeId && weekCode, pick only those.
    var employee = SH.Staff.collection.findOne({_id: selector.employeeId});
    if (!employee) return 0;
    if (employee.salary) return Math.round(employee.salary / 52);
    if (employee.hourly_rate) {
        var shifts =  SH.Shifts.collection.find(selector).fetch();
        return Math.round ( shifts ?
            ( employee.hourly_rate *
                KL.Utils.sum(shifts, function(shift) {
                    var time = Blaze._globalHelpers['dailyTimeTotal'](shift);
                    if (shift.dayCode == '6') return (time / 60) * employee.coeff_sat;
                    if (shift.dayCode == '7') return (time / 60) * employee.coeff_sun;
                    return (time / 60) * employee.coeff_mon_fri;
                }) )
            : 0 );
    }
};

SH.Shifts.totalWeeklyPayment= function totalWeeklyPayment(incomingSelector)  {
    //todo: check selector has businessId && weekCode, pick only those.
    var employees = SH.Staff.collection.find({
        businessId: incomingSelector.businessId
    }).fetch();

    return employees ?
        KL.Utils.sum ( employees, function(employee){
            var selector = {
                employeeId: employee._id,
                weekCode: incomingSelector.weekCode
            };
            return SH.Shifts.employeeWeeklyPayment(selector);
        })
        : 0;
};