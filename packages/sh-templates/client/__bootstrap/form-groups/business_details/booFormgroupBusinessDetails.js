Template['booFormgroupBusinessDetails'].rendered = function () {
    this.$isActive = this.$('[name=isActive]');

    this.$isActive .bootstrapSwitch(
        {
            onText: " ACTIVE ",
            offText: " SUSPENDED ",
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
        console.log(ret);
        return ret;
    },
    'email': function(){
        return this.emails ? this.emails[0].address : '';
    },
    'state': function(){
        if (this.isActive == 'on') return true;
        if (this.isActive == 'off') return false;
        return undefined;
    }
});

Template['booFormgroupBusinessDetails'].events({
    'click .bar': function (e, t) {

    }
});