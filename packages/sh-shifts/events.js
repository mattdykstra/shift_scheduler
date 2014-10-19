var ns = SH.Shifts.Events;
ns.fromWD = function eventFromWeekAndDay( weekStart, isoDay ) {
    if (!isoDay) return null;
    var selector = {
        weekCode: SH.Week.getWeekCode( weekStart ),
        dayCode: isoDay,
        tag: 'event'
    };
    return SH.Shifts.collection.findOne(selector);
};
