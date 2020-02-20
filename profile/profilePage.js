module.exports = function () {
  'use strict';
 var languageSelect = element(by.id('languageSelect'));
 var countrySelect = element(by.id('countrySelect'));
 var cancelButton = element(by.id('cancel-button'));
 var saveButton = element(by.id('save-button'));


 this.isDisplayed = function() {
    return languageSelect.isPresent();
  };
  
 this.languageTexts = function() {
    return languageSelect.getText();
 };
  
 this.language = function(label) {
    if (typeof label !== 'undefined') {
      element(by.css('#languageSelect option[label="' + label + '"]')).click();
      return this;
    }

    return languageSelect.getAttribute('value').then(function(value){
		//console.log(label);
      return value;
    });
 };
  
 this.countryTexts = function() {
    return countrySelect.getText();
 };
  
 this.country = function(label) {
    if (typeof label !== 'undefined') {
      element(by.css('#countrySelect option[label="' + label + '"]')).click();
      return this;
    }

    return countrySelect.getAttribute('label').then(function(label){
      return label;
    });
 };
 
 this.save = function() {
    saveButton.click();
    return this;
  };
};
