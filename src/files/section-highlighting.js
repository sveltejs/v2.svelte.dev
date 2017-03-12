var containerElement = document.querySelector("main");
var sidebarElement = document.querySelector(".sidebar");
var contentElement = document.querySelector(".content");
var sectionElements = contentElement.querySelectorAll("section, h3");
var sectionElementsLength = sectionElements.length;

var containerElementTop = containerElement.getBoundingClientRect().top;

var className = "active-section";
var sections = [];
var lastActiveSection;
var activeSidebarSection;

var rAF;

function getActiveSection () {
  updatePositions();
  var potentialActiveSection = lastActiveSection;
  var potentialActiveSectionIndex = 0; // -1 if first element;

  // Find the section that is nearest to the threshold
  for (var i = 0; i < sectionElementsLength; i++)
    if (Math.abs(potentialActiveSection.top) > Math.abs(sections[i].top)) {
      potentialActiveSection = sections[i];
      potentialActiveSectionIndex = i;
    }

  // If it's the first section, we are at
  // the very top, return it
  if (potentialActiveSectionIndex === 0) {
    return potentialActiveSection;
  }

  // We use the sections's container bounding
  // box top value instead of the window
  // because we are scrolling the container.
  // Check the CSS of <main>.

  // If the potential active section is before
  // the threshold, the we are going down and
  // this section is indeed the active one.
  if (potentialActiveSection.top < containerElementTop) {
    return potentialActiveSection;

  // If the potential section is after the threshold
  // the active section is the one before it because
  // we are going up.
  } else {
    // The one before might be the first one
    var i = potentialActiveSectionIndex - 1;
    if (i < 0) {
      return potentialActiveSection;
    } else {
    // It isn't, select and return it
      return sections[i];
    }				
  }
}

function throttle (func) {
  cancelAnimationFrame(rAF);
  rAF = requestAnimationFrame(func);
}

function onScroll () {
  throttle(function () {
    var activeSection = getActiveSection();
    if (lastActiveSection === activeSection)
      return;

    // Workaround to avoid flickering
    var activeSectionEl = document.getElementById(activeSection.id);
    activeSectionEl.removeAttribute('id');
    location.hash = activeSection.id;
    activeSectionEl.setAttribute('id', activeSection.id);

    updateActiveSidebarSection(activeSection.id);
    lastActiveSection = activeSection;
  });
}

function onResize () {
  throttle(function () {
    containerElementTop = containerElement.getBoundingClientRect().top;
    updatePositions();
  });
}

function updateActiveSidebarSection (activeId) {
  if (activeSidebarSection) {
    activeSidebarSection.classList.remove(className);
  }

  activeSidebarSection = sidebarElement.querySelector('[href="#' + activeId + '"]');
  activeSidebarSection.classList.add(className);
}

function getSections () {
  // Due to the way elements are positioned,
  // offsetTop doesn't work so we are going
  // to use the top value of the element's
  // bounding box.
  for (var i = 0; i < sectionElementsLength; i++) {
    var e = sectionElements[i];
    sections[i] = {
      id: e.id,
      top: e.getBoundingClientRect().top
    };
  }
}

function updatePositions () {
  for (var i = 0; i < sectionElementsLength; i++) {
    var e = sectionElements[i];
    sections[i].top = e.getBoundingClientRect().top
  }
}

getSections();
lastActiveSection = sections[0];

containerElement.addEventListener('scroll', onScroll);
window.addEventListener('resize', onResize);