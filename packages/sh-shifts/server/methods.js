/**
 * Created by angelo on 10/20/14.
 */
Meteor.methods({
    'shift/clock': function(data){
        //TODO: add check against time cheating.

        // server response :
        // Object {serverMoment: "Wed Oct 22 2014 09:15:11 GMT+0000",
        //      serverOffset: 0, mClient: "9:15 AM", mServer: "9:15 AM"
        // } -- this was received at 16:15 local ( local moment().zone() gives -420.

        var clientMoment = moment(data.moment), //
            offsetMinutes = data.offset,// rel. to UTC, in minutes
            stamp = data.time,// when click was submit, 12h format text string
            toggle = data.toggle, // either 'on' or 'off'
            code = data.shiftCode, // either 'shift' or 'split'
            shiftId = data.shiftId,
            ret = {},
            employeeId = data.employeeId,//in case there was no shift and shift is crafted by staff clicks.

            addon = data.addon,// this contains 'extra' data, such as 'reason why late', 'manager name' etc
        /*
             addon: { 'reason-late': 'manager'/'ok' - when closing shift },
             addon: {  manager: '<name>' - always a manager name },

             //when late and closing shift:
             addon: { 'reason-late': 'ok' - 'i love my job' },
             addon: { 'reason-late': 'manager' - 'was asked to stay back' },

             //when leaving early
             addon: { 'reason-early': 'ok'/'sick' - when leaving early : ok-> nothing to do, sick-> sick },

             //when opening shift after scheduled time
             addon: { 'reason-late': 'timer'/'late'/'ok' }
             addon: { 'reason-late': 'timer', timepicker: '9:45 AM'  -  when late and picks time},
             addon: { 'reason-late': 'late',   -  when late and time as clock-on button detects it},
             addon: { 'reason-late': 'ok',   -  when late and forgot clock-on, was in-time},

             // when no shift is scheduled, but clock-on is forced by staff
             addon: { 'reason-there': 'manager', manager: '<name>' },
         */

            clockToggleKey, // key that stores clock button timestamp
            realtimeKey,// key that stores 'real' times
            shiftStatusKey = code + 'Status', // here be 'pending'/'late'/'approved'
            shiftManagerKey = code + 'Manager',
            scheduledTimeKey, // here be planned event time
            reasonKey,
            set = {}; // record modifier

        var round15 = SH.Week.Time.roundTimeStringTo15Minutes;

        // here for debug purposes
        if (toggle == 'on' && code == 'shift') {
            ret.serverMoment = moment().toString();
            ret.serverOffset = moment().zone();
        }
        console.log(data);

        // setting up keys.
        if (toggle == 'on' && code == 'shift') {clockToggleKey = 'shiftClockOn'; scheduledTimeKey = 'shiftBegin';}
        if (toggle == 'off' && code == 'shift') {clockToggleKey = 'shiftClockOff'; scheduledTimeKey = 'shiftEnd';}
        if (toggle == 'on' && code == 'split') {clockToggleKey = 'splitClockOn'; scheduledTimeKey = 'splitBegin';}
        if (toggle == 'off' && code == 'split') {clockToggleKey = 'splitClockOff'; scheduledTimeKey = 'splitEnd';}

        // if setting up keys has failed
        if (!clockToggleKey) {
            ret.status = 'false'; return ret;
        }
        realtimeKey = scheduledTimeKey + 'Real';

        reasonKey = scheduledTimeKey + 'Reason'; //pick reason
        var reason = _.values (_.pick(addon, ['reason-there', 'reason-late', 'reason-early']));
        if (reason.length) {
            set[reasonKey]=reason[0];
        }

        set[clockToggleKey] = stamp; // storing

        if (!shiftId) { // there was no shift. new shift should be created
            if (addon && addon['reason-there'] == 'manager') { //only reason staff creates a record
                set[shiftStatusKey] = SH.Shifts.status.PENDING;
                set[shiftManagerKey] = addon['manager'];
                set[scheduledTimeKey] = stamp; //no matter.

                // this will probably be buggy at midnight.. let s wait a bit and check..
                set[realtimeKey] = round15(stamp);
                SH.Shifts.collection.insert(set);

            } else {
                ret.status = 'false';
                return ret;
            }

        } else { // shift exists
            var shift = SH.Shifts.collection.findOne({_id: shiftId});

            if (!shift) { // oops
                ret.status = 'false';
                return ret;
            }

            if (shift[clockToggleKey]) { // allow toggling clock only once.
                ret.status = 'already';
                return ret;
            }

            // generic.
            set[realtimeKey] = round15(stamp); //in general. exceptions are below.
            if (!(shift[shiftStatusKey])) //if not set - set as approved
                set[shiftStatusKey] = SH.Shifts.status.APPROVED;
            var late = shift[shiftStatusKey] == SH.Shifts.status.LATE;
            //exceptions.
            if (addon && addon['reason-there'] == 'manager') { // staff adds 2nd shift.
                set[shiftStatusKey] = SH.Shifts.status.PENDING;

                set[shiftManagerKey] = addon['manager'];
                set[scheduledTimeKey] = stamp; //no matter.

                // this will probably be buggy at midnight.. let s wait a bit and check..

            }

            if (addon && addon['reason-late'] == 'timer' && addon['timepicker']) {
                if (!late) set[shiftStatusKey] = SH.Shifts.status.PENDING;
                set[realtimeKey] = round15(addon['timepicker']);
            }

            if (addon && addon['reason-late'] == 'ok') {
                if (!late) set[shiftStatusKey] = SH.Shifts.status.PENDING;
                set[realtimeKey] = shift[scheduledTimeKey]; // staff tells he is on schedule, just forgot.
            }

            if (addon && addon['reason-late'] == 'manager') { // todo: move string keys to package, same as with statuses
                if (!late) set[shiftStatusKey] = SH.Shifts.status.PENDING;
                set[shiftManagerKey] = addon['manager'];
            }

            if (addon && addon['reason-late'] == 'late') {
                set[shiftStatusKey] = SH.Shifts.status.LATE;
            }

            if (addon && addon['reason-early'] == 'sick') {
                if (!late) set[shiftStatusKey] = SH.Shifts.status.PENDING;
            }

            SH.Shifts.collection.update({_id: shiftId}, {$set: set});

        }


        ret.mClient = clientMoment.format('h:mm A'); //debug
        ret.mServer = moment().format('h:mm A'); //debug
        return ret;
    }
});

