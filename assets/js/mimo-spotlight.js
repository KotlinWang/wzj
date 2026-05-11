(function() {
  var body = document.body;
  var hero = document.querySelector(".profile-hero");
  var heroTitle = document.getElementById("home-title");

  if (!body || !body.classList.contains("mimo-profile-home") || !hero || !heroTitle) {
    return;
  }

  if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  var spotlight = document.createElement("div");
  var stage = document.createElement("div");
  var pattern = document.createElement("div");
  var revealTitle = document.createElement("div");

  spotlight.className = "mimo-spotlight";
  spotlight.setAttribute("aria-hidden", "true");

  stage.className = "mimo-spotlight__stage";
  pattern.className = "mimo-spotlight__pattern";
  pattern.textContent = Array(120).fill("ZIJIE WANG").join("  ");

  revealTitle.className = "mimo-spotlight__title";
  revealTitle.textContent = "HELLO, I'M ZIJIE";

  stage.appendChild(pattern);
  stage.appendChild(revealTitle);
  spotlight.appendChild(stage);
  hero.appendChild(spotlight);

  var targetX = hero.clientWidth * 0.36;
  var targetY = hero.clientHeight * 0.52;
  var currentX = targetX;
  var currentY = targetY;
  var spotlightSize = 0;
  var animationFrame = null;

  var measure = function() {
    var heroRect = hero.getBoundingClientRect();
    var titleRect = heroTitle.getBoundingClientRect();
    var titleStyle = window.getComputedStyle(heroTitle);
    var titleLeft = titleRect.left - heroRect.left;
    var titleTop = titleRect.top - heroRect.top;

    spotlightSize = spotlight.offsetWidth;
    stage.style.width = heroRect.width + "px";
    stage.style.height = heroRect.height + "px";

    revealTitle.style.left = titleLeft + "px";
    revealTitle.style.top = titleTop + "px";
    revealTitle.style.width = Math.max(titleRect.width, heroRect.width - titleLeft - 24) + "px";
    revealTitle.style.fontFamily = titleStyle.fontFamily;
    revealTitle.style.fontSize = titleStyle.fontSize;
    revealTitle.style.fontWeight = titleStyle.fontWeight;
    revealTitle.style.lineHeight = titleStyle.lineHeight;
    revealTitle.style.letterSpacing = titleStyle.letterSpacing;
  };

  var renderSpotlight = function() {
    currentX += (targetX - currentX) * 0.2;
    currentY += (targetY - currentY) * 0.2;

    var left = currentX - spotlightSize / 2;
    var top = currentY - spotlightSize / 2;

    spotlight.style.transform = "translate3d(" + left + "px, " + top + "px, 0)";
    stage.style.transform = "translate3d(" + (-left) + "px, " + (-top) + "px, 0)";

    animationFrame = window.requestAnimationFrame(renderSpotlight);
  };

  var startAnimation = function() {
    if (!animationFrame) {
      animationFrame = window.requestAnimationFrame(renderSpotlight);
    }
  };

  var updateTarget = function(event) {
    var rect = hero.getBoundingClientRect();
    targetX = event.clientX - rect.left;
    targetY = event.clientY - rect.top;
    spotlight.classList.add("is-visible");
    startAnimation();
  };

  measure();
  window.addEventListener("resize", measure);
  window.addEventListener("orientationchange", measure);
  hero.addEventListener("pointerenter", updateTarget);
  hero.addEventListener("pointermove", updateTarget);
  hero.addEventListener("pointerdown", updateTarget);
  hero.addEventListener("pointerleave", function() {
    spotlight.classList.remove("is-visible");
  });
}());
