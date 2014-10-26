SH.rootEmail = 'angelo.tomarcafe@gmail.com';

SH.Email = SH.Email || {};
SH.Email.from = 'shiftscheduler@sandbox142e490a03dc482392f2e8195695593b.mailgun.org';
Meteor.startup(function(){
    process.env.MAIL_URL = //'smtp://postmaster%40meteorize.mailgun.org:YOURPASSWORD@smtp.mailgun.org:587';
        'smtp://shiftscheduler%40sandbox142e490a03dc482392f2e8195695593b.mailgun.org:xcvsrehj43uioksf892hjke89@smtp.mailgun.org:587';
});