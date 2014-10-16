SH.Validators = {};
Meteor.startup(function(){
    KL.Validation.setBucket(SH.Validators);
});

_.extend( SH.Validators, {
    "userBusinessSelector": function(user) {
        if (!_.isObject(user)) {
            user = Meteor.users.findOne({_id: user});
        }

        if (!user) return "fail";
        if (user.role == "business") {
            return {businessId: user._id}
        }
        if (user.role == "staff") {
            return {businessId: user.businessId}
        }
        return "fail";
    },
    /**
     *
     * @param user - either user _id or Meteor.user
     * @returns businessID or 'fail'
     */
    "userBusinessId": function(user) {
        //in case _id is passed and not a user object
        if (!_.isObject(user)) {
            user = Meteor.users.findOne({_id: user});
        }

        if (!user) return "fail";

        if (user.role == "business") return user._id;

        if (user.role == "staff") return user.businessId;

        return "fail";
    },
    /**
     * receive id. check if user with this is exists.
     * @param id - db _id of user
     * @returns Meteor.user of "fail"
     */
    'isUser': function (id) {
        var user = Meteor.users.findOne({_id: id});
        return user ? user : "fail";
    },
    /**
     *
     * @param id
     * @returns {Meteor.user | fail}
     */
    'isBusiness': function(id) {
        var user = _.isObject(id) ? id : Meteor.users.findOne({_id: id});
        return user && user.role == "business" ? user : "fail";
    },
    /**
     *
     * @param id
     * @returns {Meteor.user | fail}
     */
    'isStaff': function(id) {
        var user = _.isObject(id) ? id : Meteor.users.findOne({_id: id});
        return user && user.role == "staff" ? user : "fail";
    },
    /**
     *
     * @param id
     * @returns {*}
     */
    'isAdmin': function(id) {
        var user = _.isObject(id) ? id : Meteor.users.findOne({_id: id});
        return user && user.role == "admin" ? user : "fail";
    },
    /**
     * receive object. check either by .businessId or by .id ( ._id also allowed )
     *
     * @param params
     * @returns Meteor.user or "fail". object is staff user for that businessId, or for that id.
     * resolves staff user whe passed id is business user's
     */
    'isStaffExists': function(params) {
        var user;
        if (params.businessId) {
            user = Meteor.users.findOne({businessId: params.businessId, role: 'staff'});
            return user ? user : "fail"
        }
        if (params._id) params.id = params._id;
        if (params.id) {
            user = Meteor.users.findOne({_id: params.id});
            if (!user) return "fail";

            if (user.role == "staff") {
                return user;
            }
            if (user.role == 'business') {
                user = Meteor.users.findOne({businessId: params.idd, role: 'staff'});
                return user ? user : "fail";
            }
        }
    }


});