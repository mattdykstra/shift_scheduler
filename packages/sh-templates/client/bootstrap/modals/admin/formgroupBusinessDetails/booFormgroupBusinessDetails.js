Template['booFormgroupBusinessDetails'].rendered = function () {
    this.$isActive = this.$('[name=isActive]');

    this.$isActive .bootstrapSwitch(
        {
            onText: " ACTIVE ",
            offText: " SUSPENDED ",
            offColor: "warning",
            labelText: " status "
        }
    );
};

Template['booFormgroupBusinessDetails'].helpers({
    'dataForCountrySelector': function () {
        var self = this;
        var ret = {
            name: 'country',
            class: 'form-control',
            parsleyRequired: true,
            emp: 'select country...',
            selectedValue: self.country || ""
        };
        return ret;
    },
    'email': function(){
        return this.emails ? this.emails[0].address : '';
    },
    'status': function(){ //true if active account, false if suspended
        if (this.isActive == 'on') return true;
        if (this.isActive == 'off') return false;
        return undefined;
    }
});

Template['booFormgroupBusinessDetails'].events({

});