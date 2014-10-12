/**
 * Created by angelo on 10/12/14.
 */
Meteor.publish('weeklyShifts', function (week) {
    var user = KL.Validation.pass("user", this.userId);
    if (!user) {
        this.ready();
        return;
    }
    var biz = KL.Validation.pass("userBusinessSelector", user);
    var role = KL.Validation.pass("userRole", user);
    var date = SH.Week.dateFromString;

    if (!biz || !_.isDate(date._d)) {
        this.ready();
        return;
    }

    var weekCode = SH.Week.getWeekCode (week);
    var selector = _.extend(biz, {weekCode: weekCode});
    return SH.Collections.Shifts.find(selector);
});