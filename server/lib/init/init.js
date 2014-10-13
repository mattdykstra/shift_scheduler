SH.Validators = {};
Meteor.startup(function(){
   KL.Validation.setBucket(SH.Validators);
});