SH = SH || {};

SH.Week = SH.Week || {};




/**
 * internal date storage format.
 * @type {string}
 * @private
 * this should not be changed. otherwise previous db records are failing.
 */
SH.Week._momentjsFormat = 'gg W-E';

SH.Week.dateToString = function dateToString( momentObject ) {
    return momentObject.format( SH.Week._momentjsFormat );
};

SH.Week.dateFromString = function dateFromString( dateString ) {
    return moment.utc( dateString, SH.Week._momentjsFormat )
};

SH.Week.getWeekCode = function getWeekCode ( dateString ) {
    return dateString.split('-')[0];
};

SH.Week.getDayCode  = function getDayCode ( dateString ) {
    return dateString.split('-')[1];
};

SH.Week.weekStartDateString = function weekStartDate () {
    return SH.Week.dateToString( moment().isoWeekday(1) );
};
