/**
 *
 * @param selector
 * @param approved = calculate based either on scheduled or approved times
 * @returns {*|113}
 */
SH.Shifts.employeeWeeklyTime= function employeeWeeklyTime(selector, approved){
    var helper = approved ? 'dailyTimeTotalReal':'dailyTimeTotal';
    //todo: check selector has employeeId && weekCode, pick only those.
    var shifts = SH.Shifts.collection.find(selector).fetch();
    return shifts ?
        SH.Week.Time.minutesToHmmString (KL.Utils.sum(shifts, function(shift) {
            return Blaze._globalHelpers[helper](shift);
        }), true) : '';
};
/**
 *
 * @param selector
 * @param approved = calculate based either on scheduled or approved times
 * @returns {number}
 */
SH.Shifts.employeeWeeklyPayment= function employeeWeeklyPayment(selector, approved){
    var helper = approved ? 'dailyTimeTotalReal':'dailyTimeTotal';
    //todo: check selector has employeeId && weekCode, pick only those.
    var employee = SH.Staff.collection.findOne({_id: selector.employeeId});
    if (!employee) return 0;
    if (employee.salary) return Math.round(employee.salary / 52);
    if (employee.hourly_rate) {
        var shifts =  SH.Shifts.collection.find(selector).fetch();
        return Math.round ( shifts ?
            ( employee.hourly_rate *
                KL.Utils.sum(shifts, function(shift) {
                    var time = Blaze._globalHelpers[helper](shift);
                    if (shift.dayCode == '6') return (time / 60) * employee.coeff_sat;
                    if (shift.dayCode == '7') return (time / 60) * employee.coeff_sun;
                    return (time / 60) * employee.coeff_mon_fri;
                }) )
            : 0 );
    }
};
/**
 *
 * @param incomingSelector
 * @param approved  - calculate based either on scheduled or approved times
 * @returns {*|4}
 */
SH.Shifts.totalWeeklyPayment= function totalWeeklyPayment(incomingSelector, approved)  {
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
            return SH.Shifts.employeeWeeklyPayment(selector, approved);
        })
        : 0;
};

SH.Shifts.status = {PENDING: 'pending', APPROVED: 'approved', LATE: 'late'};
SH.Shifts.reason = {
    there: {MANAGER: 'manager', MISTAKE: 'mistake'},
    late: {LATE: 'late', OK: 'ok', TIMER: 'timer', MANAGER: 'manager'},
    early: {OK: 'ok', SICK: 'sick'},
    other: {VACATION: 'claimed dayoff'}
};