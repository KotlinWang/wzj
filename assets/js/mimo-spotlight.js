(function() {
  var body = document.body;
  var hero = document.querySelector(".profile-hero");
  var heroInner = hero ? hero.querySelector(".profile-hero__inner") : null;
  var heroPattern = hero ? hero.querySelector(".profile-hero__pattern") : null;
  var heroCards = hero ? hero.querySelector(".profile-hero__cards") : null;
  var heroTitle = document.getElementById("home-title");

  if (!body || !body.classList.contains("mimo-profile-home") || !hero || !heroInner || !heroPattern || !heroTitle) {
    return;
  }

  if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  var mask = document.createElement("div");
  var trail = document.createElement("div");
  var spotlight = document.createElement("div");
  var stage = document.createElement("div");
  var pattern = document.createElement("div");
  var revealLayer = document.createElement("div");

  mask.className = "mimo-spotlight-mask";
  mask.setAttribute("aria-hidden", "true");

  trail.className = "mimo-spotlight-trail";

  spotlight.className = "mimo-spotlight";

  stage.className = "mimo-spotlight__stage";
  pattern.className = "mimo-spotlight__pattern";
  pattern.textContent = Array(180).fill("KOTLIN_").join("  ");

  revealLayer.className = "profile-hero__inner profile-hero__inner--reveal";
  revealLayer.innerHTML = [
    '<p class="profile-hero__eyebrow">遥感 / 深度学习 / 灾害解译</p>',
    '<h1 class="profile-hero__cn-name"><span>王</span><span>子</span><span>杰</span></h1>',
    '<p class="profile-hero__summary">2025 年起于武汉大学 LIESMARS 攻读博士，导师为何维教授。研究聚焦<strong class="profile-hero__mark">遥感智能</strong>、<strong class="profile-hero__mark">深度学习方法</strong>与<strong class="profile-hero__mark">灾害解译</strong>。</p>',
    '<div class="profile-hero__actions">',
    '<span>查看论文 <span aria-hidden="true">&rarr;</span></span>',
    '<span>联系我 <span aria-hidden="true">&rarr;</span></span>',
    '</div>'
  ].join("");

  stage.appendChild(pattern);
  stage.appendChild(revealLayer);
  spotlight.appendChild(stage);
  mask.appendChild(trail);
  mask.appendChild(spotlight);
  hero.appendChild(mask);

  var targetX = 0;
  var targetY = 0;
  var leadX = 0;
  var leadY = 0;
  var trailX = 0;
  var trailY = 0;
  var spotlightSize = 0;
  var maskRect = null;
  var hasPointer = false;
  var animationFrame = null;
  var revealName = revealLayer.querySelector(".profile-hero__cn-name");

  var isInsideCards = function(target) {
    if (!heroCards || !target) {
      return false;
    }

    if (target === heroCards) {
      return true;
    }

    return target.closest && target.closest(".profile-hero__cards") === heroCards;
  };

  var hideSpotlight = function() {
    mask.classList.remove("is-visible");
    hasPointer = false;
  };

  var measure = function() {
    var heroRect = hero.getBoundingClientRect();
    var innerRect = heroInner.getBoundingClientRect();
    var titleRect = heroTitle.getBoundingClientRect();
    var patternRect = heroPattern.getBoundingClientRect();
    var patternStyle = window.getComputedStyle(heroPattern);
    var titleStyle = window.getComputedStyle(heroTitle);
    var cardsRect = heroCards ? heroCards.getBoundingClientRect() : null;
    var spotlightAreaHeight = cardsRect ? cardsRect.top - heroRect.top : heroRect.height;
    var preferredSize = Math.min(heroRect.width * 0.25, titleRect.height * 3.25, window.innerHeight * 0.58);
    var minSize = Math.min(280, heroRect.width * 0.42);
    var maxSize = Math.min(500, Math.max(320, window.innerHeight * 0.62));
    var responsiveSize = Math.round(Math.max(minSize, Math.min(preferredSize, maxSize)));

    mask.style.top = "0";
    mask.style.height = Math.max(0, spotlightAreaHeight) + "px";
    mask.style.left = "0";
    mask.style.width = heroRect.width + "px";
    hero.style.setProperty("--mimo-spotlight-size", responsiveSize + "px");
    spotlight.style.width = responsiveSize + "px";
    spotlight.style.height = responsiveSize + "px";
    trail.style.width = responsiveSize + "px";
    trail.style.height = responsiveSize + "px";

    maskRect = mask.getBoundingClientRect();
    var innerLeft = innerRect.left - maskRect.left;
    var innerTop = innerRect.top - maskRect.top;
    var patternLeft = patternRect.left - maskRect.left;
    var patternTop = patternRect.top - maskRect.top;

    spotlightSize = responsiveSize;
    stage.style.width = maskRect.width + "px";
    stage.style.height = maskRect.height + "px";

    pattern.style.left = patternLeft + "px";
    pattern.style.top = patternTop + "px";
    pattern.style.fontSize = patternStyle.fontSize;
    pattern.style.lineHeight = patternStyle.lineHeight;
    pattern.style.wordSpacing = patternStyle.wordSpacing;

    revealLayer.style.left = innerLeft + "px";
    revealLayer.style.top = innerTop + "px";
    revealLayer.style.width = innerRect.width + "px";
    revealLayer.style.maxWidth = innerRect.width + "px";

    if (revealName) {
      revealName.style.fontSize = titleStyle.fontSize;
      revealName.style.lineHeight = titleStyle.lineHeight;
      revealName.style.height = titleRect.height + "px";
    }
  };

  var positionCircle = function(element, x, y) {
    element.style.transform = "translate3d(" + (x - spotlightSize / 2) + "px, " + (y - spotlightSize / 2) + "px, 0)";
  };

  var renderSpotlight = function() {
    leadX += (targetX - leadX) * 0.74;
    leadY += (targetY - leadY) * 0.74;
    trailX += (leadX - trailX) * 0.16;
    trailY += (leadY - trailY) * 0.16;

    var left = leadX - spotlightSize / 2;
    var top = leadY - spotlightSize / 2;

    positionCircle(trail, trailX, trailY);
    positionCircle(spotlight, leadX, leadY);
    stage.style.transform = "translate3d(" + (-left) + "px, " + (-top) + "px, 0)";

    animationFrame = window.requestAnimationFrame(renderSpotlight);
  };

  var startAnimation = function() {
    if (!animationFrame) {
      animationFrame = window.requestAnimationFrame(renderSpotlight);
    }
  };

  var updateTarget = function(event) {
    if (isInsideCards(event.target)) {
      hideSpotlight();
      return;
    }

    if (!maskRect) {
      measure();
    }

    targetX = event.clientX - maskRect.left;
    targetY = event.clientY - maskRect.top;

    if (targetY < 0 || targetY > maskRect.height) {
      hideSpotlight();
      return;
    }

    if (!hasPointer) {
      leadX = targetX;
      leadY = targetY;
      trailX = targetX;
      trailY = targetY;
      hasPointer = true;
      positionCircle(trail, trailX, trailY);
      positionCircle(spotlight, leadX, leadY);
    }

    mask.classList.add("is-visible");
    startAnimation();
  };

  measure();
  window.addEventListener("resize", measure);
  window.addEventListener("orientationchange", measure);
  hero.addEventListener("pointerenter", updateTarget);
  hero.addEventListener("pointermove", updateTarget);
  hero.addEventListener("pointerdown", updateTarget);
  hero.addEventListener("pointerleave", function() {
    hideSpotlight();
  });
  window.addEventListener("scroll", function() {
    hideSpotlight();
  }, { passive: true });

  if (heroCards) {
    heroCards.addEventListener("pointerenter", hideSpotlight, true);
    heroCards.addEventListener("pointerover", hideSpotlight, true);
    heroCards.addEventListener("pointermove", function(event) {
      hideSpotlight();
      event.stopPropagation();
    }, true);
    heroCards.addEventListener("pointerdown", function(event) {
      hideSpotlight();
      event.stopPropagation();
    }, true);
  }
}());
