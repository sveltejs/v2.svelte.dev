var sidebarOpen = false;
var animationEnded = true;
var menuLinkEl = document.getElementsByClassName("menu-link")[0];
var sidebarEl = document.getElementsByClassName("sidebar")[0];

menuLinkEl.addEventListener( "click", handleSidebar );
sidebarEl.addEventListener( "click", handleSidebar );

function handleSidebar ( event ) {
    if ( !animationEnded ) return;
    animationEnded = false;

    if ( sidebarOpen ) {
        sidebarOpen = false;
        sidebarEl.classList.remove( "sidebar-open" );
        menuLinkEl.classList.remove( "active" );
    } else {
        sidebarOpen = true;
        sidebarEl.classList.add( "sidebar-open" );
        menuLinkEl.classList.add( "active" );
    }

    setTimeout( function () {
        animationEnded = true;
    }, 90 ); // animation duration
}