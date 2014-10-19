Meteor.subscribe('staff');
Meteor.subscribe('occupations');
Meteor.subscribe('occupations');

Meteor.autorun(function () {
    var user = Meteor.user();
    if (Blaze._globalHelpers.BusinessName) {
        if (user.role == 'business')
            document.title = Blaze._globalHelpers.BusinessName() + ": shift scheduler";
        if (user.role == 'staff')
            document.title = Blaze._globalHelpers.BusinessName() + ": daily shifts";
    }
    else document.title = " shift scheduler";
});
