Template.booModalForm2Buttons.rendered = function () {
};

Template.booModalForm2Buttons.helpers({
    'formId': function () {
        return this.modalId+'-form';
    },
    positionHeader: function(){
        return 'text-center'; //later could add some passing options here
    },
    positionButtons: function(){
        return 'text-center'; //later could add some passing options here
    }
});

Template.booModalForm2Buttons.events({

});