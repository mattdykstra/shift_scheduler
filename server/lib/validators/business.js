_.extend( SH.Validators, {
    "userBusinessSelector": function(user) {
        if (!user) return "fail";
        if (user.role == "business") {
            return {businessId: user._id}
        }
        if (user.role == "staff") {
            return {businessId: user.businessId}
        }
        return "fail";
    },
    "userBusinessId": function(user) {
        if (!user) return "fail";
        if (user.role == "business") {
            return user._id;
        }
        if (user.role == "staff") {
            return user.businessId;
        }
        return "fail";
    }
});