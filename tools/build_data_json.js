var fs = require('fs');
var marked = require('marked');
var XLSX = require('xlsx');
var _ = require('lodash');

marked.setOptions({
  smartypants: true
});

var SHEETS = [
  'BUSH',
  'CHRISTIE',
  'CLINTON',
  'CRUZ',
  'FIORINA',
  'HUCKABEE',
  'OMALLEY',
  'PAUL',
  'PERRY',
  'WARREN'
];

var workbook = XLSX.readFile('data.xlsx');

var metaSheet = workbook.Sheets['META'];
var metaData = XLSX.utils.sheet_to_json(metaSheet);

var DATA = {};

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

  DATA[sheet] = {};

  DATA[sheet]['META'] = _.find(metaData, {
    sheet_name: sheet
  });

  DATA[sheet]['CONNECTIONS'] = data;
});

fs.writeFileSync('data.json', JSON.stringify(DATA, null, 2));
