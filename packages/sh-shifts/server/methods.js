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

            key;
        if (direction == 'on' && code == 'shift') {
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
    },
    'shift/clock/force': function(data){
        var cliMoment = moment(data.moment),
            offsetMinutes = data.offset,
            stamp = data.time,
            direction = data.toggle,
            code = data.shift,
            shiftId = data.shiftId,
            ret = {},
            addon = data.addon;
        console.log(data);

    }
});
