/**
 * Created by angelo on 10/20/14.
 */
Meteor.methods({

    // somewhat heart of the app. handles clock on/clock off clicks.
    'shift/clock': function(data){
        //TODO: add check against time cheating?
        // server response :
        // Object {serverMoment: "Wed Oct 22 2014 09:15:11 GMT+0000",
        //      serverOffset: 0, mClient: "9:15 AM", mServer: "9:15 AM"
        // } -- this was received at 16:15 local ( local moment().zone() gives -420.

        /**
         * Updates employee record with last info
         * - i.e. tracks last clocked shift record,
         * useful to distinguish whether to show 'clock on' or 'clock off'
         * useful to track down missed 'clock off'
         * @param employeeId - employee id
         * @param shiftId - shift record id
         * @param code - 'shift' or 'split'
         * @param toggle 'on' or 'off'
         */
        function markEmployeeState (employeeId, shiftId, code, toggle){
            SH.Staff.collection.update({_id: employeeId}, {
                $set: {
                    lastActivity: {
                        shiftId: shiftId,
                        code: code,
                        toggle: toggle
                    }
                } });
        }

        var clientMoment = moment(data.moment), //
            offsetMinutes = data.offset,// rel. to UTC, in minutes. plan is:
                // to use offset + stamp to prevent staff cheats.
                // for now just pushing this thru the wires senseless

            stamp = data.time,// when click was submit, 12h format text string
            toggle = data.toggle, // either 'on' or 'off'
            code = data.shiftCode, // either 'shift' or 'split'
            shiftId = data.shiftId,// if there was already a split - this is its _id.
                        // if no, method probably adds new one
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
        var reasons = SH.Shifts.reason;
        // here for debug purposes
        if (toggle == 'on' && code == 'shift') {
            ret.serverMoment = moment().toString();
            ret.serverOffset = moment().zone();
        }
        console.log(data);

        var user = KL.Validation.pass('isStaff', this.userId);
        if (!user) return;
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

        //pick reason for non-ok clocks
        reasonKey = scheduledTimeKey + 'Reason';
        var reason = _.values (_.pick(addon, ['reason-there', 'reason-late', 'reason-early']));
        if (reason.length) {
            set[reasonKey]=reason[0];
        }

        set[clockToggleKey] = stamp; // store clock time

        if (!shiftId) { // there was no shift. new shift should be created
            if (addon && addon['reason-there'] == 'manager') { //only reason staff creates a record
                set[shiftStatusKey] = SH.Shifts.status.PENDING;
                set[shiftManagerKey] = addon['manager'];
                set[scheduledTimeKey] = round15(stamp);
                set['employeeId'] = employeeId;
                set[code+'Role'] = addon['role'];
                set.weekCode = addon.weekCode;
                set.dayCode = addon.dayCode;

                // this will probably be buggy at midnight.. let s wait a bit and check..
                set[realtimeKey] = round15(stamp);

                shiftId = SH.Shifts.collection.insert(set);
                markEmployeeState(employeeId, shiftId, code, toggle);
            } else {
                ret.status = 'no shift && no manager';
                return ret;
            }

        } else { // shift exists
            var shift = SH.Shifts.collection.findOne({_id: shiftId});

            if (!shift) { // oops
                ret.status = 'shiftId provided but no shift';
                return ret;
            }

            if (shift[clockToggleKey]) { // allow toggling clock only once.
                ret.status = 'already clocked this moment';
                return ret;
            }

            // generic.
            set[realtimeKey] = round15(stamp); //in general. exceptions are below.
            if (!(shift[shiftStatusKey])) //if not set - set as approved
                set[shiftStatusKey] = SH.Shifts.status.APPROVED;
            var late = shift[shiftStatusKey] == SH.Shifts.status.LATE;
            //exceptions.

            // staff adds 2nd shift. OR dayOff being cancelled
            if (addon && addon['reason-there'] == 'manager') {
                set[shiftStatusKey] = SH.Shifts.status.PENDING;
                set.dayOff = "off";
                set[shiftManagerKey] = addon['manager'];
                set[code+'Role'] = addon['role'];
                set[scheduledTimeKey] = round15(stamp); //no matter.
                // round15 probably is buggy at midnight.. let s wait a bit and check..
            }

            // non scheduled shift - lets set 'scheduled' time same as clock time
            if (toggle == 'off' && (shift[code + 'BeginReason'] == reasons.there.MANAGER)) {
                set[scheduledTimeKey] = round15(stamp);
            }


            if (addon && addon['reason-late'] == reasons.late.TIMER && addon['timepicker']) {
                if (!late) set[shiftStatusKey] = SH.Shifts.status.PENDING;
                set[realtimeKey] = round15(addon['timepicker']);
            }

            if (addon && addon['reason-late'] == reasons.late.OK) {
                if (!late) set[shiftStatusKey] = SH.Shifts.status.PENDING;
                set[realtimeKey] = shift[scheduledTimeKey]; // staff tells he is on schedule, just forgot.
            }

            if (addon && addon['reason-late'] == reasons.late.MANAGER ) { // todo: move string keys to package, same as with statuses
                if (!late) set[shiftStatusKey] = SH.Shifts.status.PENDING;
                set[shiftManagerKey] = addon['manager'];
            }

            if (addon && addon['reason-late'] == reasons.late.LATE) {
                set[shiftStatusKey] = SH.Shifts.status.LATE;
            }

            if (addon && addon['reason-early'] == reasons.early.SICK) {
                if (!late) set[shiftStatusKey] = SH.Shifts.status.PENDING;
            }

            SH.Shifts.collection.update({_id: shiftId}, {$set: set});
            markEmployeeState(employeeId, shiftId, code, toggle);
        }

        //ret.mClient = clientMoment.format('h:mm A'); //debug
        //ret.mServer = moment().format('h:mm A'); //debug
        return ret;
    },
    // this will copypaste
    'shifts/paste': function(weekCodeFrom, weekCodeTo, employeeId){
        var user = KL.Validation.pass('isBusiness', this.userId);
        var selector = {weekCode: weekCodeFrom, businessId: user._id};
        if (employeeId) _.extend(selector, {employeeId: employeeId});

        if (!user || (weekCodeFrom == weekCodeTo)) return;


        var shifts = _.map (SH.Shifts.collection.find(selector).fetch(),
            function(item) {
                var ret = _.pick(item, ['employeeId', 'shiftRole', 'splitRole',
                    'shiftBegin', 'shiftEnd', 'splitBegin', 'splitEnd', 'dayCode', 'dayOff']);
                ret.weekCode = weekCodeTo;
                //ret.unpublished = true;
                return ret;
            });

        _.each(shifts, function(shift){
            if (!shift.employeeId) return; // omit events

            var test = SH.Shifts.collection.findOne({
                employeeId: shift.employeeId,
                weekCode: weekCodeTo,
                dayCode: shift.dayCode
            });
            if (!test) //if there s already a record - bypass. else insert
                SH.Shifts.collection.insert(shift);
        });
    },

    'shifts/publish': function(weekCode) {

        var user = KL.Validation.pass('isBusiness', this.userId);

        if (!user || !weekCode) return;

        SH.Shifts.collection.update(
            {weekCode: weekCode,
                businessId: user._id},
            {$unset: {unpublished: true}},
            {multi:true})
    },
    'shift/fix/clockoff': function(value, context) {
        // todo: remove verbose errors?
        if (!context) throw new Meteor.Error('400', 'could not resolve schedule entry', 'could not resolve schedule entry');
        if (context.toggle != 'on') throw new Meteor.Error('400', 'expected last employee action being a clockon', 'expected last employee action being a clockon');

        var shiftId = context.shiftId;
        if (!shiftId) throw new Meteor.Error('400', 'could not resolve schedule entry', 'could not resolve schedule entry');

        var shift = SH.Shifts.collection.findOne({_id: shiftId});
        if (!shift) throw new Meteor.Error('400', 'could not resolve schedule entry', 'could not resolve schedule entry');

        //todo: check if value is above than shiftEnd
        var diff = SH.Week.Time.spanInMinutes(shift[context.code+'BeginReal'], value);
        if (diff<=0) throw new Meteor.Error('400', 'could not close shift - end before start', 'could not close shift - end before start');

        // last activity - closed same shift..
        var set = {};
        context.toggle = 'off';
        SH.Staff.collection.update({_id: shift.employeeId}, {$set: {lastActivity: context}});
        set[context.code+'EndReal'] = value;
        set[context.code+'ClockOff'] = value;
        set[context.code+'Status'] = SH.Shifts.status.PENDING;
        set[context.code+'EndReason'] = 'forgot to clock off';

        SH.Shifts.collection.update({_id: shiftId}, {$set: set});
        return {result: 'ok'};
    },
    "shifts/request/dayoff": function(employeeId, begin, end){
        console.log(employeeId, begin, end);
        //1. check employeeId matches logged user
        //1.1. check exists
        //2. check 'begin' is a parseable date
        //3. if !end end = begin
        //4. check end is a parseable date.
        //5. from begin to end: if employee' shift for that day exists:
        //5.1. mark as dayOff. mark as pending ('shiftBeginReason' = "claimed dayoff",
        //                  'shiftStatus: pending'(so it will be marked orange color)
        //else
        //5.2. make new shift (unpublished, pending?) for that day/employee, marked dayOff='on'
        //5.2.
        //6. send email to manager with empl. name, vacation start/end dates.

    }
});

