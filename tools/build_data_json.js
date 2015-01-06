var fs = require('fs');
var marked = require('marked');
var XLSX = require('xlsx');

marked.setOptions({
  smartypants: true
});

var SHEETS = [
  'META',
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

var DATA = {};

var workbook = XLSX.readFile('data.xlsx');

SHEETS.forEach(function(sheet) {
  'use strict';

  var worksheet = workbook.Sheets[sheet];

  var data = XLSX.utils.sheet_to_json(worksheet);

  data.forEach(function(e) {
    if (!e.blurb) {
      return;
    }
    e.blurb = marked(e.blurb);

  });


  // var temp = {};

  // for (var cell in worksheet) {
  //   if (cell[0] === '!') { continue; }
  //   if (cell[0] === 'A') {
  //     var aCell = worksheet[cell];
  //     aCell = aCell ? aCell.v : '';

  //     var cellNumber = cell.match(/\d+/)[0];

  //     var bCell = worksheet['B' + cellNumber];
  //     bCell = bCell ? bCell.v : '';

  //     var cCell = worksheet['C' + cellNumber];
  //     cCell = cCell ? cCell.v : '';


  //     if (cCell === 'markdown') {
  //       bCell = marked(bCell);
  //     }

  //     temp[aCell] = bCell;
  //   }
  // }

  DATA[sheet] = data;
});

fs.writeFileSync('data.json', JSON.stringify(DATA, null, 2));