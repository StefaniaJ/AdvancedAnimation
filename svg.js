"use strict";

window.addEventListener("DOMContentLoaded", start);

function start() {
  loadcarpetdSVG();
  loadBullets();
}

function loadcarpetdSVG() {
  fetch("svg/carpet.svg")
    .then(e => e.text())
    .then(data => {
      document.querySelector("#Layer_2").innerHTML = data;
    });
}

const sections = document.querySelectorAll("section");

function loadBullets() {
  sections.forEach(section => {
    fetch("svg/bullet.svg")
      .then(e => e.text())
      .then(data => {
        section.innerHTML = data;
        section.querySelector("svg").dataset.year = section.dataset.decade;
      });
  })
}