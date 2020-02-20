describe('BSM Dashboard Page - dashboardPageTests.js', function() {
  'use strict';
  var loginPage = new login.LoginPage();
  var mainPage = new main.MainPage();
  var dashboardPage = new main.DashboardPage();
  
  it('login to Dashboard Page', function() {
    loginPage.get('/#/userDashboard').username('admin').password('admin').login();
    expect(browser.getCurrentUrl()).toContain('/userDashboard');
    expect(dashboardPage.exceptions().header()).toContain("My Status");
  });
  
   it('Dashboard - select user - hardy', function() {
    dashboardPage.select().user('hardy');
    expect(dashboardPage.select().user()).toEqual('hardy');
  });
  
  it('Dashboard - verify Status section for user hardy - total and remaning counts', function() {
    expect(dashboardPage.exceptions().header()).toContain("hardy's Status");
    expect(dashboardPage.pieChart().isStatusChartPresent()).toBe(true);
    expect(dashboardPage.pieChart().statusPieChart(0)).toEqual("Approved 50.00 %");
    expect(dashboardPage.pieChart().statusPieChart(1)).toEqual("Remaining 50.00 %");
  }); 
  
  it('Dashboard - verify exception counts for user hardy - total, remaining and approved', function() {
    expect(dashboardPage.exceptions().total()).toEqual('8');    
    expect(dashboardPage.exceptions().remaining()).toEqual('4 (50%)');
    expect(dashboardPage.exceptions().approved()).toEqual('4 (50%)');
  }); 
  
  it('Dashboard - verify breakdown by dataflow section for user hardy', function() {
    expect(dashboardPage.data().dataflow(0)).toEqual('ManagePageCounts');
    expect(dashboardPage.data().progress(0)).toEqual('4');
    expect(dashboardPage.data().status(0)).toEqual('8 (50%)');
  });
  
  it('Dashboard - select user - mcooper', function() {
    dashboardPage.select().user('mcooper');
    expect(dashboardPage.select().user()).toEqual('mcooper');
  });
  
  it('Dashboard - verify Status section for user mcooper - total and remaning counts', function() {
    expect(dashboardPage.exceptions().header()).toContain("mcooper's Status");  
    expect(dashboardPage.pieChart().isStatusChartPresent()).toBe(true);
    expect(dashboardPage.pieChart().statusPieChart(0)).toEqual("Approved 0.00 %");
    expect(dashboardPage.pieChart().statusPieChart(1)).toEqual("Remaining 100.00 %");
  }); 
  
  it('Dashboard - verify exception counts for user mcooper - total, remaining and approved', function() {
    expect(dashboardPage.exceptions().total()).toEqual('12');
    expect(dashboardPage.exceptions().remaining()).toEqual('12 (100%)');
    expect(dashboardPage.exceptions().approved()).toEqual('0 (0%)');
  });
  
  it('Dashboard - verify breakdown by dataflow section for user mcooper', function() {
    expect(dashboardPage.data().dataflow(0)).toEqual('BSM_MultipleStages_DiffUsers_df');
    expect(dashboardPage.data().progress(0)).toEqual('0');
    expect(dashboardPage.data().status(0)).toEqual('2 (0%)');
    expect(dashboardPage.data().dataflow(2)).toEqual('EM_ExceptionEditor_ResolveDuplicates_SpacesInMatchKey_df');
    expect(dashboardPage.data().progress(2)).toEqual('0');
    expect(dashboardPage.data().status(2)).toEqual('4 (0%)');
    expect(dashboardPage.data().dataflow(4)).toEqual('EM_ExceptionMonitor_Assign_GroupBy_df');
    expect(dashboardPage.data().progress(4)).toEqual('0');
    expect(dashboardPage.data().status(4)).toEqual('4 (0%)');
    expect(dashboardPage.data().dataflow(6)).toEqual('EM_WriteExceptions_ServiceTest');
    expect(dashboardPage.data().progress(6)).toEqual('0');
    expect(dashboardPage.data().status(6)).toEqual('2 (0%)');
  });   
  
  it('Dashboard - verify dashboard state is maintained for user and progress data settings - Pitta', function() {
    dashboardPage.select().user('Pitta');
    expect(dashboardPage.exceptions().header()).toContain("Pitta's Status");
    expect(dashboardPage.exceptions().total()).toEqual('8');    
    expect(dashboardPage.exceptions().remaining()).toEqual('3 (38%)');
    expect(dashboardPage.exceptions().approved()).toEqual('5 (63%)');    
  });
  
  it('Dashboard - select user - Flacco', function() {
    dashboardPage.select().user('Flacco');
    expect(dashboardPage.select().user()).toEqual('Flacco');
  });
 
  it('Dashboard - verify Status section for user Flacco - total and remaning counts', function() {
    expect(dashboardPage.exceptions().header()).toContain("Flacco's Status");
    expect(dashboardPage.pieChart().isStatusChartPresent()).toBe(true);
    expect(dashboardPage.pieChart().statusPieChart(0)).toEqual("Approved 61.54 %");
    expect(dashboardPage.pieChart().statusPieChart(1)).toEqual("Remaining 38.46 %");
  }); 
 
  it('Dashboard - verify exception counts for user Flacco - total, remaining and approved', function() {
    expect(dashboardPage.exceptions().total()).toEqual('13');    
    expect(dashboardPage.exceptions().remaining()).toEqual('5 (38%)');
    expect(dashboardPage.exceptions().approved()).toEqual('8 (62%)');
  }); 
  
  it('Dashboard - verify Breakdown by dataflow for user Flacco - default (no filter)', function() {
    expect(dashboardPage.data().count()).toBe(4);
    expect(dashboardPage.data().isDataflowPresent()).toBe(true);
    expect(dashboardPage.data().dataflow(0)).toEqual('Dashboard_Counts');
    expect(dashboardPage.data().progress(0)).toEqual('5');
    expect(dashboardPage.data().status(0)).toEqual('10 (50%)');
    expect(dashboardPage.data().dataflow(2)).toEqual('Dashboard_Counts2');
    expect(dashboardPage.data().progress(2)).toEqual('3');
    expect(dashboardPage.data().status(2)).toEqual('3 (100%)');
  });
  
  it('Dashboard - verify Breakdown by dataflow stage details for user Flacco', function() {
    //for (var i = 0; i < 2; i++) {
    //  dashboardPage.toggleDetailButton().dataflow(i);
    //}
    dashboardPage.toggleDetailButton().dataflow('Dashboard_Counts');
    dashboardPage.toggleDetailButton().dataflow('Dashboard_Counts2');
    expect(dashboardPage.detailData().count()).toEqual(2);
    expect(dashboardPage.detailData(0).stageLabel()).toEqual("Exception Monitor");
    expect(dashboardPage.detailData(0).stageProgress()).toEqual("5");
    expect(dashboardPage.detailData(0).stageTotals()).toEqual("10 (50%)");
    
    expect(dashboardPage.detailData(1).stageLabel()).toEqual("Exception Monitor");
    expect(dashboardPage.detailData(1).stageProgress()).toEqual("3");
    expect(dashboardPage.detailData(1).stageTotals()).toEqual("3 (100%)");
    //reset
    browser.sleep(1000);
    dashboardPage.toggleDetailButton().dataflow('Dashboard_Counts');
    dashboardPage.toggleDetailButton().dataflow('Dashboard_Counts2');
    mainPage.scrollToTop();
  });
  
  it('Dashboard - set dataflow filter for user Flacco and verify dataflow name and count', function() {
    browser.sleep(1000);
    dashboardPage.dataflowFilter('counts2');
    expect(dashboardPage.dataflowFilter()).toEqual('counts2');
    dashboardPage.toggleDetailButton().dataflow('Dashboard_Counts2');
    expect(dashboardPage.data().count()).toBe(2);
    expect(dashboardPage.data().isDataflowPresent()).toBe(true);  
    expect(dashboardPage.data().dataflow(0)).toEqual('Dashboard_Counts2');
    expect(dashboardPage.data().progress(0)).toEqual('3');
    expect(dashboardPage.detailData(0).stageLabel()).toEqual("Exception Monitor");
    expect(dashboardPage.detailData(0).stageProgress()).toEqual("3");
    //reset 
    dashboardPage.toggleDetailButton().dataflow('Dashboard_Counts2');
    //mainPage.scrollToTop();
    dashboardPage.dataflowFilter('');
    expect(dashboardPage.dataflowFilter()).toEqual('');
  });
  
  it('Dashboard - select user - admin', function() {
    dashboardPage.select().user('admin');
    expect(dashboardPage.select().user()).toEqual('admin');
    dashboardPage.dataflowFilter('');
    expect(dashboardPage.dataflowFilter()).toEqual('');
  });
  
  it('Dashboard - verify Status section for user admin - total and remaning counts', function() {
    expect(dashboardPage.exceptions().header()).toContain("My Status");
    expect(dashboardPage.pieChart().isStatusChartPresent()).toBe(true);
    expect(dashboardPage.pieChart().statusPieChart(0)).toEqual("Approved 0.00 %");
    expect(dashboardPage.pieChart().statusPieChart(1)).toEqual("Remaining 100.00 %");
  }); 
  
  it('Dashboard - verify exception counts for user admin - total, remaining and approved', function() {
    expect(dashboardPage.exceptions().total()).toEqual('383');    
    expect(dashboardPage.exceptions().remaining()).toEqual('383 (100%)');
    expect(dashboardPage.exceptions().approved()).toEqual('0 (0%)');
  });
  
  it('Dashboard - verify Breakdown by dataflow for user admin', function() {
    expect(dashboardPage.data().dataflow(0)).toEqual('BSM_Internationalization_DataTypeFormats_df');
    expect(dashboardPage.data().progress(0)).toEqual('0');
    expect(dashboardPage.data().status(0)).toEqual('1 (0%)');
    
    expect(dashboardPage.data().dataflow(2)).toEqual('BSM_MultipleStages_DiffUsers_df');
    expect(dashboardPage.data().progress(2)).toEqual('0');
    expect(dashboardPage.data().status(2)).toEqual('8 (0%)');
    
    expect(dashboardPage.data().dataflow(5)).toEqual('EM_ExceptionEditor_ColumnSort_df');
    expect(dashboardPage.data().progress(5)).toEqual('0');
    expect(dashboardPage.data().status(5)).toEqual('7 (0%)');
    
    expect(dashboardPage.data().dataflow(7)).toEqual('EM_ExceptionEditor_Performance_100Exceptions');
    expect(dashboardPage.data().progress(7)).toEqual('0');
    expect(dashboardPage.data().status(7)).toEqual('307 (0%)');
    
    expect(dashboardPage.data().dataflow(9)).toEqual('EM_ExceptionMonitor_Assign_BlankToField_df');
    expect(dashboardPage.data().progress(9)).toEqual('0');
    expect(dashboardPage.data().status(9)).toEqual('3 (0%)');
    
    expect(dashboardPage.data().dataflow(11)).toEqual('EM_KPI_MultipleStages_Job1_df');
    expect(dashboardPage.data().progress(11)).toEqual('0');
    expect(dashboardPage.data().status(11)).toEqual('27 (0%)');
    
    expect(dashboardPage.data().dataflow(14)).toEqual('EM_WriteExceptions_StageOptions_ColumnOrder_df');
    expect(dashboardPage.data().progress(14)).toEqual('0');
    expect(dashboardPage.data().status(14)).toEqual('10 (0%)');
    
    expect(dashboardPage.data().dataflow(16)).toEqual('EM_WriteExceptions_StageOptions_HideFields_df');
    expect(dashboardPage.data().progress(16)).toEqual('0');
    expect(dashboardPage.data().status(16)).toEqual('10 (0%)');
    
    expect(dashboardPage.data().dataflow(18)).toEqual('EM_WriteExceptions_StageOptions_UnSelectFields_df');
    expect(dashboardPage.data().progress(18)).toEqual('0');
    expect(dashboardPage.data().status(18)).toEqual('10 (0%)');
  });
  
  it('Dashboard - verify Breakdown by dataflow stage details for user admin - need to refactoring', function() {
    var dataflows = "BSM_Internationalization_DataTypeFormats_df|BSM_MultipleStages_DiffUsers_df|EM_ExceptionEditor_ColumnSort_df|EM_ExceptionEditor_Performance_100Exceptions|EM_ExceptionMonitor_Assign_BlankToField_df|EM_KPI_MultipleStages_Job1_df|EM_WriteExceptions_StageOptions_ColumnOrder_df|EM_WriteExceptions_StageOptions_HideFields_df|EM_WriteExceptions_StageOptions_UnSelectFields_df".split('|');
    for (var i = 0; i < dataflows.length; i++) {
      dashboardPage.toggleDetailButton().dataflow(dataflows[i]); 
      mainPage.scrollToBottom();
    }  
    expect(dashboardPage.detailData().count()).toEqual(11);
    expect(dashboardPage.detailData(0).stageLabel()).toEqual("Exception Monitor");
    expect(dashboardPage.detailData(0).stageProgress()).toEqual("0");
    expect(dashboardPage.detailData(0).stageTotals()).toEqual("1 (0%)");
    
    expect(dashboardPage.detailData(1).stageLabel()).toEqual("EM Stage Label 1");
    expect(dashboardPage.detailData(1).stageProgress()).toEqual("0");
    expect(dashboardPage.detailData(1).stageTotals()).toEqual("7 (0%)");
    
    expect(dashboardPage.detailData(2).stageLabel()).toEqual("EM Stage Label 2");
    expect(dashboardPage.detailData(2).stageProgress()).toEqual("0");
    expect(dashboardPage.detailData(2).stageTotals()).toEqual("1 (0%)");
    
    expect(dashboardPage.detailData(3).stageLabel()).toEqual("Exception Monitor");
    expect(dashboardPage.detailData(3).stageProgress()).toEqual("0");
    expect(dashboardPage.detailData(3).stageTotals()).toEqual("7 (0%)");
    
    expect(dashboardPage.detailData(4).stageLabel()).toEqual("Exception Monitor");
    expect(dashboardPage.detailData(4).stageProgress()).toEqual("0");
    expect(dashboardPage.detailData(4).stageTotals()).toEqual("307 (0%)");
    
    expect(dashboardPage.detailData(5).stageLabel()).toEqual("Exception Monitor");
    expect(dashboardPage.detailData(5).stageProgress()).toEqual("0");
    expect(dashboardPage.detailData(5).stageTotals()).toEqual("3 (0%)");

    expect(dashboardPage.detailData(6).stageLabel()).toEqual("Exception Monitor 1");
    expect(dashboardPage.detailData(6).stageProgress()).toEqual("0");
    expect(dashboardPage.detailData(6).stageTotals()).toEqual("18 (0%)");
    
    expect(dashboardPage.detailData(7).stageLabel()).toEqual("Exception Monitor 2");
    expect(dashboardPage.detailData(7).stageProgress()).toEqual("0");
    expect(dashboardPage.detailData(7).stageTotals()).toEqual("9 (0%)");
    
    expect(dashboardPage.detailData(8).stageLabel()).toEqual("Exception Monitor");
    expect(dashboardPage.detailData(8).stageProgress()).toEqual("0");
    expect(dashboardPage.detailData(8).stageTotals()).toEqual("10 (0%)");
    
    expect(dashboardPage.detailData(9).stageLabel()).toEqual("Exception Monitor");
    expect(dashboardPage.detailData(9).stageProgress()).toEqual("0");
    expect(dashboardPage.detailData(9).stageTotals()).toEqual("10 (0%)");
    
    expect(dashboardPage.detailData(10).stageLabel()).toEqual("Exception Monitor");
    expect(dashboardPage.detailData(10).stageProgress()).toEqual("0");
    expect(dashboardPage.detailData(10).stageTotals()).toEqual("10 (0%)");
   
    //reset
    for (var i = 0; i < dataflows.length; i++) {
      dashboardPage.toggleDetailButton().dataflow(dataflows[i]);
    }  
    mainPage.scrollToTop(); 
  });
  
  it('logout from BSM user dashboard webui', function() {
    mainPage.logout();
    expect(browser.getCurrentUrl()).toContain('/login');
    expect(loginPage.isDisplayingError()).toBe(false);
  });
});