
Template['reset_staff'].rendered = function(){
};

Template['reset_staff'].helpers({
  email: function() {
      return this.emails ? this.emails[0].address : ''
  }
});

Template['reset_staff'].events({
    'click button': function(e,t){
        e.preventDefault();
        e.stopPropagation();

        var val= t.$('#staff_email_reset').val();
        var email = Template['reset_staff'].__helpers[' email'].call(t.data);
        if (val == email) {
            console.log('you win!');
        }
    }
});

