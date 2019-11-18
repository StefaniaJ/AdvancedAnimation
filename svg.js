"use strict";

window.addEventListener("DOMContentLoaded", start);

function start() {
  //loadcourtaindSVG();
  loadcarpetdSVG();
}

// function loadcourtaindSVG() {
//   fetch("svg/curtains.svg")
//     .then(e => e.text())
//     .then(data => {
//       document.querySelector("#Layer_1").innerHTML = data;
//     });
// }

function loadcarpetdSVG() {
  fetch("svg/carpet.svg")
    .then(e => e.text())
    .then(data => {
      document.querySelector("#Layer_2").innerHTML = data;
    });
}