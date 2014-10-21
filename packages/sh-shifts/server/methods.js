/**
 * Created by angelo on 10/20/14.
 */
Meteor.methods({
    'shift/clock': function(data){
        var cliMoment = moment(data.moment),
            offsetMinutes = data.offset,
            stamp = data.time,
            direction = data.toggle,
            code = data.shift,
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
            key;
        if (direction == 'on' && code == 'shift') { // here for debug purposes
            ret.serverMoment = moment().toString();
            ret.serverOffset = moment().zone();
        }

        console.log(data);

        if (!shiftId) {ret.status = 'false'; return ret;}
        var shift = SH.Shifts.collection.findOne({_id: shiftId});
        if (!shift) {ret.status = 'false'; return ret;}
        if (direction == 'on' && code == 'shift') key = 'shiftClockOn';
        if (direction == 'off' && code == 'shift') key = 'shiftClockOff';
        if (direction == 'on' && code == 'split') key = 'splitClockOn';
        if (direction == 'off' && code == 'split') key = 'splitClockOff';
        if (!key) {ret.status = 'false'; return ret;}

        if (shift[key]) {ret.status = 'already'; return ret;}
        ret.m1 = cliMoment.format('h:mm A');
        var set = {}; set[key] = stamp;
        SH.Shifts.collection.update({_id: shiftId}, {$set: set});
        return ret;
    }
});

