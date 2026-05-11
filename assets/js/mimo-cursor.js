(function() {
  var body = document.body;

  if (!body || !body.classList.contains("mimo-profile-home")) {
    return;
  }

  if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  var cursorDot = document.createElement("div");
  cursorDot.className = "mimo-cursor-dot";
  body.appendChild(cursorDot);

  var mouseX = window.innerWidth / 2;
  var mouseY = window.innerHeight / 2;
  var dotX = mouseX;
  var dotY = mouseY;

  var renderCursorDot = function() {
    dotX += (mouseX - dotX) * 0.22;
    dotY += (mouseY - dotY) * 0.22;
    cursorDot.style.transform = "translate3d(" + dotX + "px, " + dotY + "px, 0) translate(-50%, -50%)";
    window.requestAnimationFrame(renderCursorDot);
  };

  document.addEventListener("mousemove", function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursorDot.classList.add("is-visible");
  });

  document.addEventListener("mouseleave", function() {
    cursorDot.classList.remove("is-visible");
  });

  var hoverTargets = document.querySelectorAll("a, button");

  for (var index = 0; index < hoverTargets.length; index += 1) {
    hoverTargets[index].addEventListener("mouseenter", function() {
      cursorDot.classList.add("is-hovering");
    });
    hoverTargets[index].addEventListener("mouseleave", function() {
      cursorDot.classList.remove("is-hovering");
    });
  }

  renderCursorDot();
}());
