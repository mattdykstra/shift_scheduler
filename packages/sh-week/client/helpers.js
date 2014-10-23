_.extend(SH.Week.formats, {
    thDate: "ddd DD MMM",
    trDate: "D MMM YY ddd"});

SH.Week.weekCodeSel = function(){
    return { weekCode: SH.Week.getWeekCode (SH.Week.getString()) };
};



var helpers = {
    'isoWeekDays': function () { //iterator with named parameter
        return [
            {'dayCode': '1'}, {'dayCode': '2'}, {'dayCode': '3'},
            {'dayCode': '4'}, {'dayCode': '5'}, {'dayCode': '6'}, {'dayCode': '7'}
        ]
    },
    'thDateFromDayCode': function (isoDay) {
        return SH.Week
            .dateFromWD(SH.Week.getString(), isoDay)
            .format(SH.Week.formats.thDate);
    },
   'trDateFromDayCode': function (isoDay) {
        return SH.Week
            .dateFromWD(SH.Week.get(), isoDay)
            .format(SH.Week.formats.trDate);
    },
    'niceTime': function(time12h) {
        if (!time12h) time12h = '';
        return time12h.toLowerCase().replace(' ','');
    },
    'isCurrentWeek': function(){
        return SH.Week.getString() == SH.Week.weekStartDateString();
    }
};

Meteor.startup(function() {
    _.each(helpers, function (helper, key) {
        UI.registerHelper(key, helper);
    });
});