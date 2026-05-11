(function() {
  var body = document.body;
  var hero = document.querySelector(".profile-hero");

  if (!body || !body.classList.contains("mimo-profile-home") || !hero) {
    return;
  }

  if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  var spotlight = document.createElement("div");
  spotlight.className = "mimo-spotlight";
  spotlight.setAttribute("aria-hidden", "true");
  spotlight.innerHTML = [
    '<div class="mimo-spotlight__pattern">',
    "HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO",
    " HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO",
    "</div>",
    '<div class="mimo-spotlight__word">HELLO</div>'
  ].join("");
  hero.appendChild(spotlight);

  var targetX = hero.clientWidth * 0.28;
  var targetY = hero.clientHeight * 0.56;
  var currentX = targetX;
  var currentY = targetY;
  var isAnimating = false;

  var renderSpotlight = function() {
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;
    spotlight.style.transform = "translate3d(" + currentX + "px, " + currentY + "px, 0) translate(-50%, -50%)";
    window.requestAnimationFrame(renderSpotlight);
  };

  var updateTarget = function(event) {
    var rect = hero.getBoundingClientRect();
    targetX = event.clientX - rect.left;
    targetY = event.clientY - rect.top;
    spotlight.classList.add("is-visible");

    if (!isAnimating) {
      isAnimating = true;
      renderSpotlight();
    }
  };

  hero.addEventListener("mouseenter", updateTarget);
  hero.addEventListener("mousemove", updateTarget);
  hero.addEventListener("mouseleave", function() {
    spotlight.classList.remove("is-visible");
  });
}());
