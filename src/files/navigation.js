var sidebarOpen = false;
var menuLinkText = ["Menu", "Close"];
var menuLinkEl = document.querySelector(".menu-link");
var sidebarEl = document.querySelector(".sidebar");
var headerEl = document.querySelector("header");

menuLinkEl.addEventListener( "click", toggleSidebar, false );
window.addEventListener( "hashchange", toggleSidebar, false );

function toggleSidebar ( event ) {
    // Don't toggle when there's nothing to hide.
    if (event.type === "hashchange" && !sidebarOpen) return;

    sidebarOpen = (!sidebarOpen);
    menuLinkEl.textContent = menuLinkText[(sidebarOpen ? 1 : 0)];

    sidebarEl.classList.toggle( "sidebar-open" );
    headerEl.classList.toggle( "hidden" );
}