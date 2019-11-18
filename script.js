loadPath();

function loadPath() {
    fetch("svg/path.svg")
        .then(e => e.text())
        .then(data => {
            document.querySelector(".timeline").innerHTML = data;
            drawPath(document.querySelector(".timeline").querySelector("svg"));
        });
}

function drawPath(svgPath) {

    let path = svgPath.querySelector("#path");

    // Get length of path... ~577px in this demo
    var pathLength = path.getTotalLength();

    // Make very long dashes (the length of the path itself)
    path.style.strokeDasharray = pathLength + " " + pathLength;

    // Offset the dashes so the it appears hidden entirely
    path.style.strokeDashoffset = pathLength;

    // When the page scrolls...
    window.addEventListener("scroll", function (e) {
        // What % down is it?
        var scrollPercentage =
            (document.documentElement.scrollTop + document.body.scrollTop) /
            (document.documentElement.scrollHeight -
                document.documentElement.clientHeight);

        // Length to offset the dashes
        var drawLength = pathLength * scrollPercentage;

        // Draw in reverse
        path.style.strokeDashoffset = pathLength - drawLength;
    });
}

/*********************************************************** */


const description = document.querySelector(".description");

const allSections = document.querySelectorAll("section");

let options = {
    root: null, //the viewport
    threshold: 0.5
};

let observer = new IntersectionObserver(callback, options);

function callback(entries) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }

        //if intersecting
        loadcurtainsSVG();
        showDetails(entry.target.dataset.decade);

        //no longer observes
        //observer.unobserve(entry.target);
    });
}

//open the curtains
function loadcurtainsSVG() {
    fetch("svg/curtains.svg")
        .then(e => e.text())
        .then(data => {
            document.querySelector("#Layer_1").innerHTML = data;
        });
}

allSections.forEach(section => {
    observer.observe(section);
});

function showDetails(year) {

    const myJSON = "https://spreadsheets.google.com/feeds/list/1J--43pnvHQJ8P7i_Nd-rb-iC2312s7fKEiTOyMslAFM/od6/public/values?alt=json";

    fetch(myJSON)
        .then(e => e.json())
        .then(data => data.feed.entry.forEach(display));

    function display(data) {

        if (data.gsx$year.$t === year) {
            description.querySelector(".year").innerHTML = data.gsx$year.$t;
            description.querySelector(".text").innerHTML = data.gsx$description.$t;
            document.querySelector(".containerB #girl1").src = data.gsx$outfit.$t
        }

    }
}

// let observer = new IntersectionObserver(hide, hideOptions);