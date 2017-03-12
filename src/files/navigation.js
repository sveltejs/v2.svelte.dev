var sidebarOpen = false;
var menuText = ["Menu", "Close"];
var menuElement = document.querySelector(".menu-link");
var sidebarElement = document.querySelector(".sidebar");
var headerElement = document.querySelector("header");

menuElement.addEventListener( "click", toggleSidebar, false );
window.addEventListener( "hashchange", toggleSidebar, false );

function toggleSidebar ( event ) {
    // Don't toggle when there's nothing to hide.
    if (event.type === "hashchange" && !sidebarOpen) return;

    sidebarOpen = (!sidebarOpen);
    menuLinkEl.textContent = menuLinkText[(sidebarOpen ? 1 : 0)];

    sidebarEl.classList.toggle( "sidebar-open" );
    headerEl.classList.toggle( "hidden" );
}