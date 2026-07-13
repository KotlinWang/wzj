---
permalink: /
title: ""
excerpt: ""
author_profile: false
body_class: "mimo-profile-home research-observatory"
redirect_from:
  - /about/
  - /about.html
---

<main class="observatory-home" id="main-content">
  <section class="hero" id="overview" aria-labelledby="hero-title" data-assessment-src="{{ '/assets/media/identity/hero-damage-assessment.jpg' | relative_url }}">
    <picture class="hero-media" aria-hidden="true">
      <source media="(max-width: 700px)" srcset="{{ '/assets/media/identity/hero-observatory-mobile.png' | relative_url }}">
      <img src="{{ '/assets/media/identity/hero-observatory-desktop.png' | relative_url }}" alt="" width="1672" height="941" fetchpriority="high" decoding="async">
    </picture>
    <div class="hero-tone" aria-hidden="true"></div>
    <div class="hero-grid" aria-hidden="true"></div>

    <div class="shell hero-shell">
      <div class="hero-copy" data-reveal>
        <p class="eyebrow"><span class="live-dot" aria-hidden="true"></span><span data-spotlight-zh="灾害智能 · 地球观测">DISASTER INTELLIGENCE · EARTH OBSERVATION</span></p>
        <h1 id="hero-title"><span data-spotlight-zh="王子杰">Zijie</span> <span class="accent" data-spotlight-zh="遥感智能.">Wang.</span></h1>
        <p class="hero-statement"><span data-spotlight-zh="面向灾后决策，构建可靠、开放、可泛化的遥感智能。">Reliable, open, and generalizable remote sensing intelligence for post-disaster decision-making.</span></p>
        <p class="hero-intro"><span data-spotlight-zh="武汉大学 LIESMARS 摄影测量与遥感博士生，研究灾害解译、深度学习与智能地球观测。">I am a Ph.D. student in Photogrammetry and Remote Sensing at WHU LIESMARS, developing deep-learning methods for disaster interpretation and intelligent Earth observation.</span></p>

        <div class="hero-actions">
          <a class="button button--dark" href="#publications"><span>Explore Selected Work</span><i class="fas fa-arrow-down" aria-hidden="true"></i></a>
          <a class="text-link" href="https://scholar.google.com/citations?user=S7yHOaYAAAAJ" target="_blank" rel="noreferrer"><span>Google Scholar</span><i class="fas fa-external-link-alt" aria-hidden="true"></i></a>
        </div>
      </div>

      <div class="hero-signals" aria-label="Research workflow" data-reveal>
        <div><span>OBSERVE</span><strong>Earth Observation</strong></div>
        <div><span>INTERPRET</span><strong>Disaster Intelligence</strong></div>
        <div><span>DELIVER</span><strong>Decision Support</strong></div>
      </div>
    </div>

    <a class="scroll-cue" href="#research" aria-label="Continue to research"><i class="fas fa-arrow-down" aria-hidden="true"></i></a>
  </section>

  <section class="section research-section" id="research" aria-labelledby="research-title">
    <div class="shell">
      <header class="section-heading section-heading--split" data-reveal>
        <div>
          <p class="section-kicker">Research Framework</p>
          <h2 id="research-title">Turning disaster observations into faster, finer, and more <span>trustworthy intelligence.</span></h2>
        </div>
        <p>My work links multi-source observations, robust representation learning, fine-grained damage assessment, and open-world generalization into a coherent pipeline for disaster intelligence.</p>
      </header>

      <div class="method-grid">
        <article class="method-card signal-surface" data-edge data-reveal style="--delay: 0ms">
          <div class="method-meta"><span>01</span><strong>OBSERVE</strong><small>DATA / EO</small></div>
          <div class="method-layout">
            <div class="method-art"><img src="{{ '/assets/media/identity/method-observe.png' | relative_url }}" alt="" width="1448" height="1086" loading="lazy" decoding="async"></div>
            <div class="method-copy">
              <h3>Multi-source Earth observation</h3>
              <p>Building dependable spatiotemporal evidence from satellite, aerial, and ground observations while explicitly accounting for data quality, uncertainty, and change.</p>
              <div class="method-keywords"><span>Satellite</span><span>Aerial</span><span>Ground</span></div>
            </div>
          </div>
        </article>

        <article class="method-card signal-surface" data-edge data-reveal style="--delay: 70ms">
          <div class="method-meta"><span>02</span><strong>REPRESENT</strong><small>METHOD / DL</small></div>
          <div class="method-layout">
            <div class="method-art"><img src="{{ '/assets/media/identity/method-represent.png' | relative_url }}" alt="" width="1448" height="1086" loading="lazy" decoding="async"></div>
            <div class="method-copy">
              <h3>Robust representation learning</h3>
              <p>Integrating spectral, spatial, and semantic cues to learn reliable representations under domain shift and limited supervision.</p>
              <div class="method-keywords"><span>Spectral</span><span>Spatial</span><span>Semantic</span></div>
            </div>
          </div>
        </article>

        <article class="method-card signal-surface" data-edge data-reveal style="--delay: 140ms">
          <div class="method-meta"><span>03</span><strong>ASSESS</strong><small>TASK / DAMAGE</small></div>
          <div class="method-layout">
            <div class="method-art"><img src="{{ '/assets/media/identity/method-assess.png' | relative_url }}" alt="" width="1448" height="1086" loading="lazy" decoding="async"></div>
            <div class="method-copy">
              <h3>Fine-grained damage assessment</h3>
              <p>Moving from regional change detection to instance-level building assessment with greater timeliness, granularity, and interpretability.</p>
              <div class="method-keywords"><span>Timely</span><span>Fine-grained</span><span>Interpretable</span></div>
            </div>
          </div>
        </article>

        <article class="method-card signal-surface" data-edge data-reveal style="--delay: 210ms">
          <div class="method-meta"><span>04</span><strong>GENERALIZE</strong><small>SYSTEM / OPEN</small></div>
          <div class="method-layout">
            <div class="method-art"><img src="{{ '/assets/media/identity/method-generalize.png' | relative_url }}" alt="" width="1448" height="1086" loading="lazy" decoding="async"></div>
            <div class="method-copy">
              <h3>Open-world generalization</h3>
              <p>Developing reusable models that transfer across regions, sensors, and hazard types without assuming a closed world.</p>
              <div class="method-keywords"><span>Regions</span><span>Sensors</span><span>Hazards</span></div>
            </div>
          </div>
        </article>
      </div>

      <div class="keyword-rail" data-reveal aria-label="Research themes">
        <span>Representation Learning</span><span>Semantic Segmentation</span><span>Damage Assessment</span><span>Urban Applications</span>
      </div>
    </div>
  </section>

  <section class="section publications-section" id="publications" aria-labelledby="publications-title">
    <div class="shell">
      <header class="section-heading section-heading--dark" data-reveal>
        <p class="section-kicker">Evidence &amp; Output</p>
        <h2 id="publications-title">Selected Work</h2>
        <p>A focused selection spanning AI and remote sensing synthesis, monocular 3D vision, VHR urban segmentation, and disaster-monitoring signals.</p>
      </header>

      <article class="featured-project signal-surface" data-edge data-reveal>
        <div class="featured-media featured-media--figure">
          <img src="{{ '/assets/media/projects/jrs-full.jpg' | relative_url }}" alt="Annual publication trend chart from the AI and remote sensing review" width="1400" height="1151" loading="lazy" decoding="async">
          <span>FEATURED / SYNTHESIS</span>
        </div>
        <div class="featured-copy">
          <p class="project-venue">JRS 2026</p>
          <h3>AI and Remote Sensing: A Review</h3>
          <p class="project-title">A review of AI and remote sensing research: Current status and future prospects</p>
          <p>A structured synthesis of the tasks, methods, and emerging directions through which artificial intelligence is reshaping remote sensing.</p>
          <div class="project-actions"><a href="https://www.ygxb.ac.cn/zh/article/doi/10.11834/jrs.20265510/" target="_blank" rel="noreferrer">Paper<i class="fas fa-arrow-right" aria-hidden="true"></i></a></div>
        </div>
      </article>

      <div class="project-list">
        <article class="project-row signal-surface" data-edge data-reveal>
          <div class="project-order">01</div>
          <div class="project-meta"><strong>TIP 2025</strong><span>3D VISION</span></div>
          <div class="project-copy">
            <h3><span>Human-inspired Monocular <span class="technical-token">3D</span> Detection</span></h3>
            <p class="project-title">MoVis: When 3D Object Detection is Like Human Monocular Vision</p>
            <p>A human-inspired monocular 3D framework that couples visual representation, depth cues, and spatial reasoning.</p>
          </div>
          <div class="project-actions">
            <a href="https://github.com/KotlinWang/MoVis" target="_blank" rel="noreferrer">Code<i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            <a href="https://ieeexplore.ieee.org/document/10916602/" target="_blank" rel="noreferrer">Paper<i class="fas fa-arrow-right" aria-hidden="true"></i></a>
          </div>
          <div class="project-row-media project-row-media--video">
            <video class="project-video" poster="{{ '/assets/media/projects/movis.jpg' | relative_url }}" autoplay muted loop playsinline controls preload="none" aria-label="Animated qualitative results from MoVis">
              <source data-src="{{ '/assets/media/projects/movis.mp4' | relative_url }}" type="video/mp4">
            </video>
          </div>
        </article>

        <article class="project-row signal-surface" data-edge data-reveal>
          <div class="project-order">02</div>
          <div class="project-meta"><strong>ISPRS JPRS 2025</strong><span>SEGMENTATION</span></div>
          <div class="project-copy">
            <h3><img class="title-trophy" src="{{ '/images/trophy.png' | relative_url }}" alt="Highly cited paper" width="40" height="40">VHR Semantic Segmentation for Urban Applications</h3>
            <p class="project-title">Accurate semantic segmentation of very high-resolution remote sensing images considering feature state sequences</p>
            <p class="project-highlight">ESI Highly Cited Paper</p>
          </div>
          <div class="project-actions">
            <a href="https://github.com/KotlinWang/UrbanSSF" target="_blank" rel="noreferrer">Code<i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            <a href="https://doi.org/10.1016/j.isprsjprs.2025.01.017" target="_blank" rel="noreferrer">Paper<i class="fas fa-arrow-right" aria-hidden="true"></i></a>
          </div>
          <div class="project-row-media project-row-media--video">
            <video class="project-video" poster="{{ '/assets/media/projects/urbanssf.jpg' | relative_url }}" autoplay muted loop playsinline controls preload="none" aria-label="Animated qualitative results from UrbanSSF">
              <source data-src="{{ '/assets/media/projects/urbanssf.mp4' | relative_url }}" type="video/mp4">
            </video>
          </div>
        </article>

        <article class="project-row signal-surface" data-edge data-reveal>
          <div class="project-order">03</div>
          <div class="project-meta"><strong>RSE 2024</strong><span>MONITORING</span></div>
          <div class="project-copy">
            <h3>Whistler Recognition for Disaster Monitoring</h3>
            <p class="project-title">Lightning-generated whistler recognition for accurate disaster monitoring</p>
            <p>A homologous dual-feature enhancement framework for robust recognition of complex disaster-monitoring signals.</p>
          </div>
          <div class="project-actions">
            <a href="https://github.com/KotlinWang/DIEF" target="_blank" rel="noreferrer">Code<i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            <a href="https://doi.org/10.1016/j.rse.2024.114021" target="_blank" rel="noreferrer">Paper<i class="fas fa-arrow-right" aria-hidden="true"></i></a>
          </div>
          <div class="project-row-media project-row-media--figure"><img src="{{ '/assets/media/projects/rse-full.jpg' | relative_url }}" alt="Full architecture diagram of the lightning whistler recognition framework" width="1600" height="1267" loading="lazy" decoding="async"></div>
        </article>
      </div>
    </div>
  </section>

  <section class="section trajectory-section" id="trajectory" aria-labelledby="trajectory-title">
    <div class="shell">
      <header class="section-heading section-heading--split" data-reveal>
        <div>
          <p class="section-kicker">Academic Trajectory</p>
          <h2 id="trajectory-title">Methods evolve. The scientific question remains grounded in real-world needs.</h2>
        </div>
        <p>From computer vision to remote sensing scene understanding and disaster response, every stage advances the same goal: reliable evidence that supports action.</p>
      </header>

      <div class="trajectory-grid">
        <figure class="portrait-panel" data-reveal>
          <img src="{{ '/images/wzj.png' | relative_url }}" alt="Illustrated portrait of Zijie Wang" width="512" height="512" loading="lazy" decoding="async">
          <figcaption><strong>Zijie Wang</strong><span>REMOTE SENSING · DISASTER INTELLIGENCE</span></figcaption>
        </figure>

        <div class="trajectory-list" data-reveal>
          <h3><i class="fas fa-graduation-cap" aria-hidden="true"></i>Education</h3>
          <article><time>2025.09 - Present</time><div><strong>Ph.D. in Photogrammetry and Remote Sensing</strong><span>Wuhan University · LIESMARS</span></div></article>
          <article><time>2022.09 - 2025.06</time><div><strong>M.Eng. in Computer Technology</strong><span>Central South University of Forestry and Technology</span></div></article>
          <article><time>2018.09 - 2022.06</time><div><strong>B.Eng. in Computer Science and Technology</strong><span>University of Emergency Management</span></div></article>
        </div>

        <div class="signal-list" data-reveal>
          <h3><i class="fas fa-broadcast-tower" aria-hidden="true"></i>Research Updates</h3>
          <article><time>2026.06</time><div><strong>Second Place in the BRIGHT Challenge</strong><span>CVPR 2026 MONTI Workshop</span></div></article>
          <article><time>2026.05</time><div><strong>UrbanSSF named an ESI Highly Cited Paper</strong><span>ISPRS Journal of Photogrammetry and Remote Sensing</span></div></article>
          <article><time>2026.05</time><div><strong>Invited to present at AIRS 2026</strong><span>From Timely and Reliable to Open and Generalizable: Explorations in Post-Disaster Damaged Building Assessment</span></div></article>
          <article><time>2026.02</time><div><strong>AI and remote sensing review accepted</strong><span>Journal of Remote Sensing</span></div></article>
          <article><time>2025.03</time><div><strong>MoVis accepted</strong><span>IEEE Transactions on Image Processing</span></div></article>
        </div>
      </div>
    </div>
  </section>

  <section class="section recognition-section" id="recognition" aria-labelledby="recognition-title">
    <div class="shell">
      <header class="recognition-heading" data-reveal>
        <p class="section-kicker">Recognition</p>
        <h2 id="recognition-title">Recognition for rigorous research with practical relevance.</h2>
      </header>

      <div class="award-rail">
        <article data-reveal>
          <span class="award-number">2<sup>nd</sup></span>
          <div><time>2026.06</time><h3>Second Place, BRIGHT Challenge</h3><p>CVPR 2026 MONTI Workshop · Instance-level all-weather building damage mapping</p></div>
        </article>
        <article data-reveal>
          <img src="{{ '/images/trophy.png' | relative_url }}" alt="" width="64" height="64" loading="lazy" decoding="async">
          <div><time>2026.05</time><h3>ESI Highly Cited Paper</h3><p>UrbanSSF · Very-high-resolution semantic segmentation for urban applications</p></div>
        </article>
        <article data-reveal>
          <i class="fas fa-award" aria-hidden="true"></i>
          <div><time>2024.10</time><h3>National Scholarship for Graduate Students</h3><p>The 2024 National Scholarship for Graduate Students</p></div>
        </article>
      </div>
    </div>
  </section>

  <section class="contact-section" id="contact" aria-labelledby="contact-title">
    <div class="shell contact-layout" data-reveal>
      <div>
        <p class="section-kicker">Collaboration</p>
        <h2 id="contact-title">Open to research collaboration, academic exchange, and consequential problems in Earth observation.</h2>
      </div>
      <div class="contact-actions">
        <a href="mailto:Lebron.wang26@gmail.com"><i class="fas fa-envelope" aria-hidden="true"></i><span>Email</span></a>
        <a href="https://github.com/KotlinWang" target="_blank" rel="noreferrer"><i class="fab fa-github" aria-hidden="true"></i><span>GitHub</span></a>
        <a href="https://scholar.google.com/citations?user=S7yHOaYAAAAJ" target="_blank" rel="noreferrer"><i class="fas fa-book-open" aria-hidden="true"></i><span>Google Scholar</span></a>
      </div>
    </div>
  </section>
</main>
