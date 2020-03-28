const assert = require("assert")
const {Given, When, Then} = require("cucumber")
const {getAnalysis, totalCost, getAnalysisInDate} = require('../../core')
const {saveList, readAllCostInDate, emptyAll, logoutCacheDb} = require('../../core/db');

function costItem(type, cost, detail='', time){
  return {
    type,
    cost,
    detail,
    time
  }
}

function list(str){
  return str.split(',').map(it => it.trim())
}

Given('I have no record today', function(){
  this.todayCostItems = []
}) 

When('I add records with cost of {string}, type of {string} today', function(costList, typeList){
  costList = list(costList)
  typeList = list(typeList)
  costList.forEach((cost, index) => {
    this.todayCostItems.push(costItem(typeList[index], cost));
  });
})

Then('The percentage list of the records will be {string}', function(percentMap) {
  percentMap = JSON.parse(percentMap)
  assert.deepEqual(percentMap, getAnalysis(this.todayCostItems));
})

Then('I will be shown analysis', function(){
  //console.log('Yse I got here');
})

Then('The total cost will be {string}', function (total) {
  return assert.equal(total, totalCost(this.todayCostItems));
});


Given('I have no record in {string}', function (string) {
  // Write code here that turns the phrase above into concrete actions
  emptyAll();
});


When('I add records with cost of {string}, type of {string} in {string}', function (costList, typeList, date) {
  costList = list(costList)
  typeList = list(typeList)
  const listToSave = costList.map((cost, index) => {
    return costItem(typeList[index], cost, '', date);
  });
  return saveList(listToSave);
});


Then('I get analysis in {string}', function (date) {
  // Write code here that turns the phrase above into concrete actions
});;

Then('The percentage map in {string} will be {string}', function (date, percentMap) {
  // Write code here that turns the phrase above into concrete actions
  percentMap = JSON.parse(percentMap)
  return getAnalysisInDate(date).then(result => {
    assert.deepEqual(percentMap, result);
  })
});