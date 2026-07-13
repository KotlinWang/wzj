(function() {
  "use strict";

  var body = document.body;

  if (!body || !body.classList.contains("research-observatory")) {
    return;
  }

  var root = document.documentElement;
  var header = document.querySelector(".site-header");
  var nav = document.getElementById("observatory-nav");
  var menuButton = document.querySelector(".menu-button");
  var menuIcon = menuButton ? menuButton.querySelector("i") : null;
  var navLinks = nav ? nav.querySelectorAll("a[href^='#']") : [];
  var hero = document.querySelector(".hero");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var scrollFrame = null;
  var navSections = [];

  function measureNavigation() {
    navSections = [];

    for (var linkIndex = 0; linkIndex < navLinks.length; linkIndex += 1) {
      var href = navLinks[linkIndex].getAttribute("href");
      var section = href && href.charAt(0) === "#" ? document.getElementById(href.slice(1)) : null;

      if (section) {
        navSections.push({
          link: navLinks[linkIndex],
          top: section.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0)
        });
      }
    }
  }

  function updateActiveNavigation(top) {
    if (!navSections.length) {
      return;
    }

    var marker = top + Math.min(window.innerHeight * 0.32, 260);
    var activeLink = navSections[0].link;

    for (var sectionIndex = 0; sectionIndex < navSections.length; sectionIndex += 1) {
      if (navSections[sectionIndex].top <= marker) {
        activeLink = navSections[sectionIndex].link;
      }
    }

    for (var activeIndex = 0; activeIndex < navLinks.length; activeIndex += 1) {
      var isActive = navLinks[activeIndex] === activeLink;
      navLinks[activeIndex].classList.toggle("is-active", isActive);

      if (isActive) {
        navLinks[activeIndex].setAttribute("aria-current", "location");
      } else {
        navLinks[activeIndex].removeAttribute("aria-current");
      }
    }
  }

  function updateScrollScene() {
    if (scrollFrame) {
      return;
    }

    scrollFrame = window.requestAnimationFrame(function() {
      var top = window.scrollY || window.pageYOffset || 0;
      var range = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      var progress = Math.min(top / range, 1);
      var heroShift = reduceMotion ? 0 : Math.max(-28, -top * 0.04);

      root.style.setProperty("--scroll-progress", String(progress));
      root.style.setProperty("--hero-scroll-y", heroShift + "px");
      root.classList.toggle("is-scrolled", top > 28);
      updateActiveNavigation(top);
      scrollFrame = null;
    });
  }

  function closeMenu() {
    if (!nav || !menuButton) {
      return;
    }

    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    body.classList.remove("menu-open");

    if (menuIcon) {
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    }
  }

  function toggleMenu() {
    if (!nav || !menuButton) {
      return;
    }

    var willOpen = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", willOpen);
    menuButton.setAttribute("aria-expanded", willOpen ? "true" : "false");
    menuButton.setAttribute("aria-label", willOpen ? "Close navigation" : "Open navigation");
    body.classList.toggle("menu-open", willOpen);

    if (menuIcon) {
      menuIcon.classList.toggle("fa-bars", !willOpen);
      menuIcon.classList.toggle("fa-times", willOpen);
    }
  }

  if (menuButton) {
    menuButton.addEventListener("click", toggleMenu);
  }

  if (nav) {
    nav.addEventListener("click", function(event) {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });
  }

  document.addEventListener("click", function(event) {
    if (nav && nav.classList.contains("is-open") && header && !header.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", function() {
    if (window.innerWidth > 900) {
      closeMenu();
    }

    measureNavigation();
  });

  var revealElements = document.querySelectorAll("[data-reveal]");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    for (var revealFallbackIndex = 0; revealFallbackIndex < revealElements.length; revealFallbackIndex += 1) {
      revealElements[revealFallbackIndex].classList.add("is-visible");
    }
  } else {
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: "0px 0px -8%",
      threshold: 0.08
    });

    for (var revealIndex = 0; revealIndex < revealElements.length; revealIndex += 1) {
      revealObserver.observe(revealElements[revealIndex]);
    }
  }

  var edgeSurfaces = document.querySelectorAll("[data-edge]");

  if (finePointer && !reduceMotion) {
    for (var edgeIndex = 0; edgeIndex < edgeSurfaces.length; edgeIndex += 1) {
      (function(surface) {
        var surfaceRect = null;
        var surfaceFrame = null;
        var surfaceScrollPosition = 0;
        var pointerX = 0;
        var pointerY = 0;

        function renderSurfacePointer() {
          var normalizedX = pointerX / Math.max(surfaceRect.width, 1) - 0.5;
          var normalizedY = pointerY / Math.max(surfaceRect.height, 1) - 0.5;

          surface.style.setProperty("--mx", pointerX + "px");
          surface.style.setProperty("--my", pointerY + "px");
          surface.style.setProperty("--shift-x", normalizedX * 7 + "px");
          surface.style.setProperty("--shift-y", normalizedY * 5 + "px");
          surface.style.setProperty("--tilt-x", normalizedY * -1.2 + "deg");
          surface.style.setProperty("--tilt-y", normalizedX * 1.2 + "deg");
          surfaceFrame = null;
        }

        function trackSurfacePointer(event) {
          var currentScrollPosition = window.scrollY || window.pageYOffset || 0;

          if (!surfaceRect || surfaceScrollPosition !== currentScrollPosition) {
            surfaceRect = surface.getBoundingClientRect();
            surfaceScrollPosition = currentScrollPosition;
          }

          pointerX = event.clientX - surfaceRect.left;
          pointerY = event.clientY - surfaceRect.top;
          surface.classList.add("is-pointed");

          if (!surfaceFrame) {
            surfaceFrame = window.requestAnimationFrame(renderSurfacePointer);
          }
        }

        surface.addEventListener("pointerenter", function(event) {
          surfaceRect = surface.getBoundingClientRect();
          surfaceScrollPosition = window.scrollY || window.pageYOffset || 0;
          trackSurfacePointer(event);
        }, { passive: true });
        surface.addEventListener("pointermove", trackSurfacePointer, { passive: true });
        surface.addEventListener("pointerleave", function() {
          if (surfaceFrame) {
            window.cancelAnimationFrame(surfaceFrame);
            surfaceFrame = null;
          }

          surfaceRect = null;
          surface.classList.remove("is-pointed");
          surface.style.setProperty("--mx", "50%");
          surface.style.setProperty("--my", "50%");
          surface.style.setProperty("--shift-x", "0px");
          surface.style.setProperty("--shift-y", "0px");
          surface.style.setProperty("--tilt-x", "0deg");
          surface.style.setProperty("--tilt-y", "0deg");
        }, { passive: true });
      }(edgeSurfaces[edgeIndex]));
    }
  }

  if (hero && finePointer && !reduceMotion) {
    var heroParallaxRect = null;
    var heroParallaxFrame = null;
    var heroParallaxScrollPosition = 0;
    var heroParallaxX = 0;
    var heroParallaxY = 0;

    hero.addEventListener("pointerenter", function() {
      heroParallaxRect = hero.getBoundingClientRect();
      heroParallaxScrollPosition = window.scrollY || window.pageYOffset || 0;
    }, { passive: true });
    hero.addEventListener("pointermove", function(event) {
      var currentScrollPosition = window.scrollY || window.pageYOffset || 0;

      if (!heroParallaxRect || heroParallaxScrollPosition !== currentScrollPosition) {
        heroParallaxRect = hero.getBoundingClientRect();
        heroParallaxScrollPosition = currentScrollPosition;
      }

      heroParallaxX = (event.clientX - heroParallaxRect.left) / Math.max(heroParallaxRect.width, 1) - 0.5;
      heroParallaxY = (event.clientY - heroParallaxRect.top) / Math.max(heroParallaxRect.height, 1) - 0.5;

      if (!heroParallaxFrame) {
        heroParallaxFrame = window.requestAnimationFrame(function() {
          root.style.setProperty("--hero-pointer-x", heroParallaxX * -10 + "px");
          root.style.setProperty("--hero-pointer-y", heroParallaxY * -7 + "px");
          heroParallaxFrame = null;
        });
      }
    }, { passive: true });

    hero.addEventListener("pointerleave", function() {
      heroParallaxRect = null;
      root.style.setProperty("--hero-pointer-x", "0px");
      root.style.setProperty("--hero-pointer-y", "0px");
    }, { passive: true });
  }

  function initHeroSpotlight() {
    var sourceShell = hero ? hero.querySelector(":scope > .hero-shell") : null;

    if (!hero || !sourceShell || !finePointer || reduceMotion) {
      return;
    }

    var mask = document.createElement("div");
    var trail = document.createElement("div");
    var orb = document.createElement("div");
    var stage = document.createElement("div");
    var assessmentImage = document.createElement("img");
    var translatedShell = sourceShell.cloneNode(true);

    mask.className = "hero-spotlight-mask";
    mask.setAttribute("aria-hidden", "true");
    trail.className = "hero-spotlight-trail";
    orb.className = "hero-spotlight-orb";
    stage.className = "hero-spotlight-stage";
    assessmentImage.className = "hero-assessment-layer";
    assessmentImage.alt = "";
    assessmentImage.setAttribute("aria-hidden", "true");
    assessmentImage.setAttribute("draggable", "false");
    assessmentImage.src = hero.getAttribute("data-assessment-src");
    translatedShell.classList.add("hero-shell--translated");

    var clonedIds = translatedShell.querySelectorAll("[id]");
    var clonedReveals = translatedShell.querySelectorAll("[data-reveal]");
    var clonedLinks = translatedShell.querySelectorAll("a");
    var translatedNodes = translatedShell.querySelectorAll("[data-spotlight-zh]");

    for (var idIndex = 0; idIndex < clonedIds.length; idIndex += 1) {
      clonedIds[idIndex].removeAttribute("id");
    }

    for (var cloneRevealIndex = 0; cloneRevealIndex < clonedReveals.length; cloneRevealIndex += 1) {
      clonedReveals[cloneRevealIndex].removeAttribute("data-reveal");
      clonedReveals[cloneRevealIndex].classList.add("is-visible");
    }

    for (var cloneLinkIndex = 0; cloneLinkIndex < clonedLinks.length; cloneLinkIndex += 1) {
      var visualLink = document.createElement("span");
      visualLink.className = clonedLinks[cloneLinkIndex].className;

      while (clonedLinks[cloneLinkIndex].firstChild) {
        visualLink.appendChild(clonedLinks[cloneLinkIndex].firstChild);
      }

      clonedLinks[cloneLinkIndex].parentNode.replaceChild(visualLink, clonedLinks[cloneLinkIndex]);
    }

    for (var translatedIndex = 0; translatedIndex < translatedNodes.length; translatedIndex += 1) {
      translatedNodes[translatedIndex].textContent = translatedNodes[translatedIndex].getAttribute("data-spotlight-zh");
    }

    stage.appendChild(assessmentImage);
    stage.appendChild(translatedShell);
    orb.appendChild(stage);
    mask.appendChild(trail);
    mask.appendChild(orb);
    hero.appendChild(mask);

    var heroRect = null;
    var targetX = 0;
    var targetY = 0;
    var trailX = 0;
    var trailY = 0;
    var spotlightSize = 0;
    var visible = false;
    var assessmentMode = false;
    var animationFrame = null;
    var protectedBounds = [];
    var translatedLayoutSelectors = [
      ".eyebrow",
      "h1",
      ".hero-statement",
      ".hero-intro",
      ".hero-actions",
      ".hero-signals"
    ];
    var protectedRegions = [
      hero.querySelector(".hero-copy"),
      hero.querySelector(".hero-signals")
    ].filter(function(region) {
      return Boolean(region);
    });

    function positionCircle(element, x, y) {
      element.style.transform = "translate3d(" + (x - spotlightSize / 2) + "px," + (y - spotlightSize / 2) + "px,0)";
    }

    function positionStage() {
      stage.style.transform = "translate3d(" + (spotlightSize / 2 - targetX) + "px," + (spotlightSize / 2 - targetY) + "px,0)";
    }

    function measureSpotlight() {
      heroRect = hero.getBoundingClientRect();
      var shellRect = sourceShell.getBoundingClientRect();
      var preferredSize = Math.min(heroRect.width * 0.21, window.innerHeight * 0.38);

      spotlightSize = Math.round(Math.max(220, Math.min(preferredSize, 340)));
      mask.style.width = heroRect.width + "px";
      mask.style.height = heroRect.height + "px";
      trail.style.width = spotlightSize + "px";
      trail.style.height = spotlightSize + "px";
      orb.style.width = spotlightSize + "px";
      orb.style.height = spotlightSize + "px";
      stage.style.width = heroRect.width + "px";
      stage.style.height = heroRect.height + "px";
      translatedShell.style.left = shellRect.left - heroRect.left + "px";
      translatedShell.style.top = shellRect.top - heroRect.top + "px";
      translatedShell.style.width = shellRect.width + "px";
      translatedShell.style.height = shellRect.height + "px";
      translatedShell.style.minHeight = shellRect.height + "px";
      protectedBounds = protectedRegions.map(function(region) {
        var regionRect = region.getBoundingClientRect();

        return {
          left: regionRect.left - heroRect.left,
          right: regionRect.right - heroRect.left,
          top: regionRect.top - heroRect.top,
          bottom: regionRect.bottom - heroRect.top
        };
      });

      for (var layoutIndex = 0; layoutIndex < translatedLayoutSelectors.length; layoutIndex += 1) {
        var selector = translatedLayoutSelectors[layoutIndex];
        var sourceElement = sourceShell.querySelector(selector);
        var translatedElement = translatedShell.querySelector(selector);

        if (!sourceElement || !translatedElement) {
          continue;
        }

        var sourceRect = sourceElement.getBoundingClientRect();
        translatedElement.style.position = "absolute";
        translatedElement.style.left = sourceRect.left - shellRect.left + "px";
        translatedElement.style.top = sourceRect.top - shellRect.top + "px";
        translatedElement.style.width = sourceRect.width + "px";
        translatedElement.style.margin = "0";
      }

      var sourceName = sourceShell.querySelector("h1 > span:first-child");
      var translatedName = translatedShell.querySelector("h1 > span:first-child");

      if (sourceName && translatedName) {
        translatedName.style.width = sourceName.getBoundingClientRect().width + "px";
      }
    }

    function stopAnimation() {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    }

    function hideSpotlight() {
      visible = false;
      assessmentMode = false;
      mask.classList.remove("is-visible");
      mask.classList.remove("is-assessment");
      orb.classList.remove("is-assessment");
      stopAnimation();
    }

    function overlapsProtectedContent(x, y) {
      var radius = spotlightSize / 2 + 14;

      for (var regionIndex = 0; regionIndex < protectedBounds.length; regionIndex += 1) {
        var bounds = protectedBounds[regionIndex];
        var left = bounds.left;
        var right = bounds.right;
        var top = bounds.top;
        var bottom = bounds.bottom;
        var nearestX = Math.max(left, Math.min(x, right));
        var nearestY = Math.max(top, Math.min(y, bottom));
        var distanceX = x - nearestX;
        var distanceY = y - nearestY;

        if (distanceX * distanceX + distanceY * distanceY <= radius * radius) {
          return true;
        }
      }

      return false;
    }

    function isClearAssessmentArea(x, y) {
      var normalizedX = x / Math.max(heroRect.width, 1);
      var normalizedY = y / Math.max(heroRect.height, 1);
      var cloudBoundary = 0.41 + normalizedY * 0.08;
      var transitionMargin = assessmentMode ? -0.012 : 0.012;

      return normalizedX >= cloudBoundary + transitionMargin && !overlapsProtectedContent(x, y);
    }

    function renderTrail() {
      if (!visible) {
        animationFrame = null;
        return;
      }

      trailX += (targetX - trailX) * 0.32;
      trailY += (targetY - trailY) * 0.32;
      positionCircle(trail, trailX, trailY);
      animationFrame = window.requestAnimationFrame(renderTrail);
    }

    function showAtPointer(event) {
      if (window.innerWidth <= 900) {
        hideSpotlight();
        return;
      }

      if (!heroRect) {
        measureSpotlight();
      }

      targetX = event.clientX - heroRect.left;
      targetY = event.clientY - heroRect.top;

      if (targetX < 0 || targetX > heroRect.width || targetY < 0 || targetY > heroRect.height) {
        hideSpotlight();
        return;
      }

      if (!visible) {
        trailX = targetX;
        trailY = targetY;
        visible = true;
        mask.classList.add("is-visible");
      }

      positionCircle(orb, targetX, targetY);
      positionCircle(trail, trailX, trailY);
      positionStage();

      assessmentMode = isClearAssessmentArea(targetX, targetY);
      mask.classList.toggle("is-assessment", assessmentMode);
      orb.classList.toggle("is-assessment", assessmentMode);

      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(renderTrail);
      }
    }

    measureSpotlight();
    window.setTimeout(measureSpotlight, 700);
    hero.addEventListener("pointerenter", function(event) {
      measureSpotlight();
      showAtPointer(event);
    });
    hero.addEventListener("pointermove", showAtPointer, { passive: true });
    hero.addEventListener("pointerdown", showAtPointer);
    hero.addEventListener("pointerleave", hideSpotlight);
    window.addEventListener("scroll", function() {
      heroRect = null;
      hideSpotlight();
    }, { passive: true });
    window.addEventListener("resize", function() {
      hideSpotlight();
      measureSpotlight();
    });
    document.addEventListener("visibilitychange", function() {
      if (document.hidden) {
        hideSpotlight();
      }
    });
  }

  initHeroSpotlight();

  var projectVideos = document.querySelectorAll(".project-video");

  if (reduceMotion) {
    for (var reducedVideoIndex = 0; reducedVideoIndex < projectVideos.length; reducedVideoIndex += 1) {
      projectVideos[reducedVideoIndex].removeAttribute("autoplay");
    }
  }

  function loadProjectVideo(video) {
    if (video.getAttribute("data-loaded") === "true") {
      return;
    }

    var sources = video.querySelectorAll("source[data-src]");

    for (var sourceIndex = 0; sourceIndex < sources.length; sourceIndex += 1) {
      sources[sourceIndex].src = sources[sourceIndex].getAttribute("data-src");
      sources[sourceIndex].removeAttribute("data-src");
    }

    video.setAttribute("data-loaded", "true");
    video.load();
  }

  function playProjectVideo(video) {
    if (reduceMotion || document.hidden || video.getAttribute("data-in-view") !== "true") {
      return;
    }

    if (video.readyState < 2) {
      if (video.getAttribute("data-play-pending") !== "true") {
        video.setAttribute("data-play-pending", "true");
        video.addEventListener("canplay", function handleCanPlay() {
          video.removeAttribute("data-play-pending");
          playProjectVideo(video);
        }, { once: true });
      }

      return;
    }

    var playPromise = video.play();

    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(function() {});
    }
  }

  if (projectVideos.length) {
    if ("IntersectionObserver" in window) {
      var videoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          entry.target.setAttribute("data-in-view", entry.isIntersecting ? "true" : "false");

          if (entry.isIntersecting) {
            loadProjectVideo(entry.target);
            playProjectVideo(entry.target);
          } else {
            entry.target.pause();
          }
        });
      }, {
        rootMargin: "220px 0px",
        threshold: 0.01
      });

      for (var videoIndex = 0; videoIndex < projectVideos.length; videoIndex += 1) {
        videoObserver.observe(projectVideos[videoIndex]);
      }
    } else {
      for (var fallbackVideoIndex = 0; fallbackVideoIndex < projectVideos.length; fallbackVideoIndex += 1) {
        projectVideos[fallbackVideoIndex].setAttribute("data-in-view", "true");
        loadProjectVideo(projectVideos[fallbackVideoIndex]);
        playProjectVideo(projectVideos[fallbackVideoIndex]);
      }
    }

    document.addEventListener("visibilitychange", function() {
      for (var visibilityIndex = 0; visibilityIndex < projectVideos.length; visibilityIndex += 1) {
        var video = projectVideos[visibilityIndex];

        if (document.hidden) {
          video.pause();
        } else {
          playProjectVideo(video);
        }
      }
    });
  }

  measureNavigation();
  window.addEventListener("load", function() {
    measureNavigation();
    updateScrollScene();
  }, { once: true });
  window.addEventListener("scroll", updateScrollScene, { passive: true });
  updateScrollScene();
}());
