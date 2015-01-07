var fs = require('fs');
var marked = require('marked');
var XLSX = require('xlsx');
var _ = require('lodash');

marked.setOptions({
  smartypants: true
});

var SHEETS = [
  'PERRY',
  'CRUZ',
  'BUSH',
  'CLINTON',
  'PAUL',
  'FIORINA',
  'HUCKABEE',
  'OMALLEY',
  'WARREN',
  'SANTORUM',
  'CHRISTIE'
];

var workbook = XLSX.readFile('data.xlsx');

var metaSheet = workbook.Sheets['META'];
var metaData = XLSX.utils.sheet_to_json(metaSheet);

var DATA = {
  DATA: []
};

SHEETS.forEach(function(sheet) {
  'use strict';

  var worksheet = workbook.Sheets[sheet];

  var data = XLSX.utils.sheet_to_json(worksheet);

  data.forEach(function(e) {
    if (!e.connection_text) {
      return;
    }
    e.blurb = marked(e.connection_text);

  });

  var tempData = {};

  tempData.META = _.find(metaData, {
    sheet_name: sheet
  });

  tempData.CONNECTIONS = data;

  DATA.DATA.push(tempData);
});

fs.writeFileSync('data.json', JSON.stringify(DATA, null, 2));
