// -- page to nevigate
// page:from HTML CLICK Example /page:/01/demos/index.html

function loadPage(page) {

    // --Get Reference for the HTML ELEMENT BY ITS ID
    // --contentFrame is iFrame element type

    let iframeElement = document.getElementById("contentFrame");
    // -- Give the iFrame the HTML ADDRESS 
    iframeElement.src = page;

    // Close sidebar on mobile
    document.getElementById("sidebar").classList.remove("show");
}

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("show");
}