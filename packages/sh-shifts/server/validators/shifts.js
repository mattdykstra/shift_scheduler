// logic: on every day/employee pair, there s possible only one object in collection
// this object can contain:
// dayOff: user has vacation on this day - then other fields are ignored

// shiftBegin: stringified 12h time`
// shiftEnd: stringified 12h time`
// shiftRole: _id of role

// splitBegin: stringified 12h time`
// splitEnd: stringified 12h time`
// splitRole: _id of role

// there also can be 'event records'
// they are labeled with 'tag: event', contain no 'employeeId' , and also contain 'name' field
//

SH.Collections.Shifts.allow({
    insert: function(userId, doc) {
        //business can insert.


        var user = KL.Validation.pass("isBusiness", userId);
        if (user) return true;

        // for staff user - allow setting dayOff on emtpy day
        user = KL.Validation.pass("isStaff", userId);
        if (user && doc.dayOff) return true;

    },
    update: function(userId, doc, fields, modifier) {
        var businessId = KL.Validation.pass('userBusinessId', userId);
        return (doc.businessId === businessId);
    },
    remove: function(userId, doc) {
        return (doc.businessId === userId);
    }
});

SH.Collections.Shifts.before.insert(
    function(userId, doc) {
        doc.businessId = KL.Validation.pass('userBusinessId', userId);

        doc.staffEdited = KL.Validation.pass('isStaff') ? true : null;
    }
);

SH.Collections.Shifts.before.update(
    function(userId, doc) {
        // all updates/inserts from staff going to be marked as staffEdited.
        // those are going to be reviewed
        var staff = KL.Validation.pass('isStaff');
        doc.staffEdited = staff ? true : null;
    }
);

SH.Collections.Shifts.deny({
    update: function (userId, doc, fields, modifier) {
        // can't change businessId
        if (_.contains(fields, 'businessId')) return true;

        // allow only biz and staff users - and modify only own docs
        var businessId = KL.Validation.pass('userBusinessId', userId);
        if (doc.businessId !== businessId) return true;
        return false;
    }
});
