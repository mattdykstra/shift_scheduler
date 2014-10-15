/**
 * internal date storage format.
 * @type {string}
 * this should not be changed. otherwise previous db records are failing.
 */
SH.Week.formats = {};
_.extend (SH.Week.formats, {storage: 'gg W-E'});

SH.Week.dateToString = function dateToString( momentObject ) {
    return momentObject.format( SH.Week.formats.storage );
};

SH.Week.dateFromString = function dateFromString( dateString ) {
    return moment.utc( dateString, SH.Week.formats.storage )
};

// take 'gg W' part of 'gg W-E'
SH.Week.getWeekCode = function getWeekCode ( dateString ) {
    return dateString.split('-')[0];
};

// take 'E' part of 'gg W-E'
SH.Week.getDayCode  = function getDayCode ( dateString ) {
    return dateString.split('-')[1];
};

// return 'gg W-E' for monday. current monday or monday of week that momentObject belongs to
SH.Week.weekStartDateString = function weekStartDateString ( momentObject ) {
    return SH.Week.dateToString( momentObject ?
            momentObject.isoWeekday(1) : moment().isoWeekday(1)
    );
};

/**
 * constructs date
 * mainly to be used from helpers.
 * @param weekStartString - string with date of week start (i.e. of monday)
 * @param isoDay - 1-mon 7-sun
 * @returns {momentjs object}
 */
SH.Week.dateFromWD = function dateFromWeekStringAndDayCode (weekStartString, isoDay) {
    return this.dateFromString( weekStartString ) .day(isoDay);
};

SH.Week.Time = {};

/**
 // receives strings produced by timepicker. their format is 'h:mm a'
 *
 * @param start12h - start time
 * @param end12h - end time
 * @returns {difference in minutes, negative if start later than end}
 */

SH.Week.Time.spanInMinutes = function(start12h, end12h){
    if (!start12h || !end12h) return null;
    var dayFormat = 'YY M D ';
    var fullFormat = 'YY M D h:mm a';
    var day_ = moment.utc().format(dayFormat)
    var start = day_+ start12h;
    var end = day_+ end12h;

    return (moment(end, fullFormat). diff(moment(start, fullFormat), 'minutes') );
};