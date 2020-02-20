module.exports = function () {
  'use strict';
  var userSelect = element(by.css('#selectedUser'));
  var rows = element.all(by.css('ul li'));
  var inputFilter = element(by.id("statusFilter"));
  var pieChartElement = element(by.id("statusChart"));
  var statusLegendText = element.all(by.css('#statusChart svg g g g g g text'));
  
  this.dataflowFilter = function(value) {
    if (typeof value !== 'undefined') {
      inputFilter.clear();
      // Setter
      inputFilter.sendKeys(value);
      inputFilter.sendKeys(protractor.Key.ENTER);
      browser.sleep(1000);
      return inputFilter;
    }
    // Getter
    else if (typeof value === 'undefined') {
      return inputFilter.getAttribute('value');
    }
  }
  
  this.select = function() {  
    var rows = element.all(by.css('#selectedUser_listbox li'));
    return {
      count: function () {
        return rows.count();
      },
      user: function (value) {
          var index = 0; var allFields = "";
          if (typeof value !== 'undefined') {
            element(by.css('#selectedUserDiv span span span span')).click(); browser.sleep(1000);
            //setUserText(value);
            rows.then (function(items) {
              items.forEach(function(item) {
                item.getText().then(function(text) {
                  allFields += text + "|";
                });
              });
            }).then (function() {
              allFields = allFields.substring(0, allFields.length - 1);
              var array = allFields.split('|');
              for (var j=0; j<array.length; j++) {
                if (array[j].indexOf(value) != -1)
                  rows.get(j).click();
              } 
            });
          }
          return userSelect.getAttribute('value').then(function(value){
            return value;
          }); 
       // };
      }
    };
  };
 
  // no longer used - it has been removed from UI
  this.column = function() {
    var rows = element.all(by.css('div table thead tr'));
    return {
      dataflow: function() {
        return rows.get(0).all(by.css('th')).get(0).getText();
      },
      progress: function() {
        return rows.get(0).all(by.css('th')).get(1).getText();
      }
    };
  };
  
  this.data = function() {
    var rows = element.all(by.css('#dataflowsStatus tbody tr'));
    return {
      count: function() {
        return element.all(by.repeater('dataflow in vm.dataflows')).count();
      },
      dataflow: function(num) {
        return rows.get(num).all(by.css('th')).get(0).getText();
      },
      progress: function(num) {
        return rows.get(num).all(by.css('td')).get(1).getText();
      },
      status: function(num) {
        return rows.get(num).all(by.css('td')).get(2).getText();
      },
      isDataflowPresent: function() {
        return element(by.css('tbody tr td')).isPresent();
      }
    };
  };
  
  this.detailData = function(index) {
    var statusLabel; 
    var all = '';
    var repeater = element.all(by.repeater('stage in dataflow.stages'));
    return {
      count: function() {
          return repeater.count();
      },
      stageLabel: function() {
        //statusLabel = '#detailStatusLabel-' + index + ' a';
        return repeater.get(index).element(by.css('th a')).getText().then(function(text) {
          console.log(text);
          return text;
        });    
      },  
      stageProgress: function() {
        return repeater.get(index).all(by.css('td div')).get(1).getText().then(function(text) {
          console.log(text);
          return text;
        });    
      },
      stageTotals: function() {
        return repeater.get(index).all(by.css('td div')).get(2).getText().then(function(text) {
          console.log(text);
          return text;
        });    
      }        
    };
  };
  
  this.exceptions = function() {
    return {
      header: function() {
        //return element.all(by.css('div div div h3')).get(0).getText();
        return element(by.id('userName')).getText();
      },
      total: function() {
        return element(by.id('total')).getText();
      },
      remaining: function() {
        return element(by.id('remaining')).getText();
      },
      approved: function() {
        return element(by.id('approvedCount')).getText();
      }
    };
  };
  
  this.pieChart = function() {
    return {
      isStatusChartPresent: function() {
        return pieChartElement.isPresent();
      },
      statusPieChart: function(userIndex) {
        var user = statusLegendText.get(userIndex);
        return user.getText().then(function(text) {
          return text;
        });
      },
    };
  };
 
  this.toggleDetailButtonOld = function() {  
    return {
      dataflow: function(row) {
        var item = dfRepeater;
        var detailsButton = dfRepeater.all(by.css('td a i')).get(row);
        detailsButton.click();
       // browser.sleep(2000);
      }
    };
  };
  
  this.toggleDetailButton = function() {
    return {
      dataflow: function(dataflow) {
        var id = 'detailButton-' + dataflow;
        console.log(id);
        element(by.id(id)).element(by.css('a i')).click();
      }
    };
  };
  
  function setUserText(value) {
    var input = element(by.css('#selectedUser-list span input'));
    wait.until.present(input);
    input.clear();
    input.sendKeys(value);
  };
  
};
