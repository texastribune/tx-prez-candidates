/* global pym */

var pymChild = new pym.Child();

$(window).load(function() {
  'use strict';
  pymChild.sendMessage('height', '' + document.body.scrollHeight)
});

