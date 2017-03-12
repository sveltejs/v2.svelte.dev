var sidebarOpen = false;
var menuText = ["Menu", "Close"];
var menuElement = document.querySelector(".menu-link");
var sidebarElement = document.querySelector(".sidebar");
var headerElement = document.querySelector("header");
var rAF;

menuElement.addEventListener( "click", toggleSidebar, false );
window.addEventListener( "hashchange", toggleSidebar, false );

function toggleSidebar ( event ) {
    // Don't toggle when there's nothing to hide.
    if (event.type === "hashchange" && !sidebarOpen) return;

    sidebarOpen = (!sidebarOpen);

    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(function () {
        sidebarElement.classList.toggle( "sidebar-open" );
        headerElement.classList.toggle( "hidden" );
        menuElement.textContent = menuText[(sidebarOpen ? 1 : 0)];
    });
}