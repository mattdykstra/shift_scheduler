var options = {
    apiKey: 'key-4f89198c51b5e5b6d0ec09e9b19ab820',
    domain: 'sandbox142e490a03dc482392f2e8195695593b.mailgun.org'
};


SH.Email = SH.Email || {};
SH.Email.from = 'shiftscheduler@sandbox142e490a03dc482392f2e8195695593b.mailgun.org';

//var Email = new Mailgun(options);
Meteor.startup(function(){
  process.env.MAIL_URL = //'smtp://postmaster%40meteorize.mailgun.org:YOURPASSWORD@smtp.mailgun.org:587';
    'smtp://shiftscheduler%40sandbox142e490a03dc482392f2e8195695593b.mailgun.org:xcvsrehj43uioksf892hjke89@smtp.mailgun.org:587';
});


Meteor.methods({
    sendEmail: function (to, from, subject, text) {
        check([to, from, subject, text], [String]);
        console.log("here");
        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        });
    }
});