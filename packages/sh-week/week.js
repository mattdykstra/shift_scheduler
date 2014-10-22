/**
 * internal date storage format.
 * @type {string}
 * this should not be changed. otherwise previous db records are failing.
 */
SH.Week.formats = {};
_.extend (SH.Week.formats, {storage: 'gg W-E'});


SH.Week.dateToString = function dateToString( momentObject ) {
    if (!momentObject) momentObject = moment();
    return momentObject.format( SH.Week.formats.storage );
};


SH.Week.dateFromString = function dateFromString( dateString ) {
    return moment.utc( dateString, SH.Week.formats.storage )
};

// take 'gg W' part of 'gg W-E'
// if nothing passed - get today's
SH.Week.getWeekCode = function getWeekCode ( dateString ) {
    if (!dateString) dateString = SH.Week.dateToString ( moment() );
    return dateString.split('-')[0];
};

// take 'E' part of 'gg W-E'
// if nothing passed - get today's
SH.Week.getDayCode  = function getDayCode ( dateString ) {
    if (!dateString) dateString = SH.Week.dateToString ( moment() );
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
 // receives strings produced by timepicker. their format is 'h:mm A'
 *
 * @param start12h - start time
 * @param end12h - end time
 * @returns {difference in minutes, negative if start later than end}
 */

SH.Week.Time.formats = SH.Week.Time.formats || {};
SH.Week.Time.formats.time12 = 'h:mm A';

SH.Week.Time.todayMomentFromTimeString = function ( time12h ){
    var dayFormat = 'YY M D ';
    var fullFormat = 'YY M D h:mm A';
    var day_ = moment.utc().format(dayFormat);
    var day_time = day_ + time12h;
    return moment(day_time, fullFormat);
};

SH.Week.Time.spanInMinutes = function(start12h, end12h){
    if (!start12h || !end12h) return null;
    var startMoment = SH.Week.Time.todayMomentFromTimeString ( start12h );
    var endMoment = SH.Week.Time.todayMomentFromTimeString ( end12h );
    if (startMoment.isValid() && endMoment.isValid())
        return endMoment. diff(startMoment, 'minutes') ;
    return null;
};

var SHIFT_BREAK_MINUTES = 30;
var SHIFT_LENGTH_FOR_BREAK_MINUTES = 300;
/**
 * same as spanInMinutes, but counts for 30 minutes break on long shifts
 * @param start12h
 * @param end12h
 */
SH.Week.Time.spanInMinutesNormalized = function spanInMinutesNormalized(start12h, end12h) {
    var ret = this.spanInMinutes(start12h, end12h);
    if (ret != null) {
        if (ret > SHIFT_LENGTH_FOR_BREAK_MINUTES)
        ret -= SHIFT_BREAK_MINUTES;
    }
    return ret;
};

// convert number in minutes to 'h:mm' span string
SH.Week.Time.minutesToHmmString = function minutesToHmmString(totalMinutes){
    function pad2(number) {
        if (number < 10) return '0'+number.toString();
        return number.toString();
    }

    if (_.isString(totalMinutes)) miutes = parseInt(totalMinutes);
    if (isNaN(totalMinutes)) {
        console.log ('exception: passed non-number.');
        return '###';
    }
    if (totalMinutes < 0) {
        console.log ('exception: negative total.');
        return '###';
    }
    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;
    return hours+":"+pad2(minutes);
};

// return time part string
SH.Week.Time.momentToHmmString = function ( momentObject ){
    momentObject = momentObject || moment();
    return momentObject.format(SH.Week.Time.formats.time12)
};

// take nearest 15 minutes rounded value
SH.Week.Time.roundMomentTo15Minutes = function ( momentObject ) {
    momentObject = momentObject || moment();
    var seconds = momentObject.minutes()*60 + momentObject.seconds();
    seconds = Math.round(seconds / 900) * 900;
    return momentObject.minutes(seconds / 60);
};

SH.Week.Time.roundTimeStringTo15Minutes = function ( timeString ) {
    var moment = SH.Week.Time.todayMomentFromTimeString ( timeString );
    var rounded = SH.Week.Time.roundMomentTo15Minutes ( moment );
    return SH.Week.Time.momentToHmmString ( rounded );
};