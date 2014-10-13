/**
 * Created by angelo on 10/13/14.
 */

SH = SH || {};
SH.Staff = SH.Staff || {};

SH.Collections.Staff.allow({
    insert: function(userId, doc) {
        var user = KL.Validation.pass("isBusiness", userId);
        return user ? true : false;
    },
    update: function(userId, doc, fields, modifier) {
        return (doc.businessId === userId);
    },
    remove: function(userId, doc) {
        return (doc.businessId === userId);
    }
});

SH.Collections.Staff.before.insert(
    function(userId, doc) {
        doc.businessId = userId;
    }
);

SH.Collections.Staff.deny({
    update: function (userId, docs, fields, modifier) {
        // can't change businessId
        return _.contains(fields, 'businessId');
    }
});