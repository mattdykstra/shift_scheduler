/**
 * Created by angelo on 10/9/14.
 */
Template['main_wrapper'].helpers({
    noUsers: function(){ return Session.get("shNoAdmin");}
});

Meteor.startup(function(){
    if (!Meteor.userId()) {
        Meteor.call("users/check/admin", function(err, ret){
            console.log(ret);
            Session.set("shNoAdmin", ret ? false: true);
        })
    }
});