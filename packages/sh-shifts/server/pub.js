Meteor.publish('weeklyShifts', function (week) {
    var user = KL.Validation.pass("isUser", this.userId);
    if (!user || !week) {
        this.ready();
        return;
    }
    var biz = KL.Validation.pass("userBusinessSelector", user);
    var date = SH.Week.dateFromString();

    if (!biz || !_.isDate(date._d)) {
        this.ready();
        return;
    }

    var weekCode = SH.Week.getWeekCode (week);
    var selector = _.extend(biz, {weekCode: weekCode});
    if (user.role == 'staff') _.extend(selector, {unpublished : {$ne: true}});
    return SH.Collections.Shifts.find(selector);
});