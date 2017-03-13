function initSidebar () {
    var sidebarOpen = false;
    var menuText = ["Menu", "Close"];
    var menuElement = document.querySelector(".menu-link");
    var sidebarElement = document.querySelector(".sidebar");
    var mainElement = document.querySelector("main");
    var headerElement = document.querySelector("header");
    var rAF;

    mainElement.addEventListener( "click", toggleSidebar, true );
    menuElement.addEventListener( "click", toggleSidebar, false );
    window.addEventListener( "hashchange", toggleSidebar, false );

    function toggleSidebar ( event ) {
        // Don't toggle when there's nothing to hide.
        if (event.type === "hashchange" && !sidebarOpen) return;
        if (event.currentTarget === mainElement && !sidebarOpen) return;

        sidebarOpen = (!sidebarOpen);

        cancelAnimationFrame(rAF);
        rAF = requestAnimationFrame(function () {
            sidebarElement.classList.toggle( "sidebar-open" );
            headerElement.classList.toggle( "hidden" );
            menuElement.textContent = menuText[(sidebarOpen ? 1 : 0)];
        });
    }
}

initSidebar();