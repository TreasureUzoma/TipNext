const isDesktop = window.matchMedia("(min-width: 769px)");


window.onresize = function() {
  if (isDesktop.matches) {
    alert("This website is not available for desktop view. Please switch to mobile view for a more comfortable view.");
  }
};