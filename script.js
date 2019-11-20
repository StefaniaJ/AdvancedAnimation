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

    // Get length of path...
    let pathLength = path.getTotalLength();

    // Make very long dashes (the length of the path itself)
    path.style.strokeDasharray = pathLength + " " + pathLength;

    // Offset the dashes so it appears hidden entirely
    path.style.strokeDashoffset = pathLength;

    // When the page scrolls...
    window.addEventListener("scroll", function (e) {
        // What % down is it?
        let scrollPercentage =
            (document.documentElement.scrollTop + document.body.scrollTop) /
            (document.documentElement.scrollHeight -
                document.documentElement.clientHeight);

        // Length to offset the dashes
        let drawLength = pathLength * scrollPercentage;

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
        description.classList.add("show");
        showDetails(entry.target.dataset.decade);
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

//text animation
const textOptions = {
    root: null,
    threshold: 0
}

const textObserver = new IntersectionObserver(function (entries, textObserver) {
    entries.forEach(entry => {
        description.classList.remove("show");

        closecurtainsSVG();
    })
}, textOptions);

allSections.forEach(section => {
    observer.observe(section);
    textObserver.observe(section);
});

function closecurtainsSVG() {
    fetch("svg/closecurtains.svg")
        .then(e => e.text())
        .then(data => {
            document.querySelector("#Layer_1").innerHTML = data;
        });
}

function showDetails(year) {

    const myJSON = "https://spreadsheets.google.com/feeds/list/1J--43pnvHQJ8P7i_Nd-rb-iC2312s7fKEiTOyMslAFM/od6/public/values?alt=json";

    fetch(myJSON)
        .then(e => e.json())
        .then(data => data.feed.entry.forEach(display));

    function display(data) {

        if (data.gsx$year.$t === year) {
            description.querySelector(".year").textContent = data.gsx$year.$t;
            description.querySelector(".year").style.fontFamily = data.gsx$font.$t;
            //description.querySelector(".year").style.color = data.gsx$color.$t;
            description.querySelector(".text").textContent = data.gsx$description.$t;
            document.querySelector(".containerB #girl1").src = data.gsx$outfit.$t
        }

    }

    //show text decoration
    fetch("svg/ornament.svg")
        .then(e => e.text())
        .then(data => {
            document.querySelector(".description .decoration").innerHTML = data;
        });

}