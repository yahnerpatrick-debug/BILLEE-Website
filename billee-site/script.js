(function () {
  var cfg = window.SITE_CONFIG || {};
  var links = cfg.links || {};

  function $(id) { return document.getElementById(id); }

  /* ---------- Button / link wiring from config ---------- */
  function setLink(id, href) {
    var el = $(id);
    if (el && href) el.setAttribute("href", href);
  }
  setLink("btnJoin", links.joinUs);
  setLink("btnRover", links.ourRover);
  setLink("btnApproaches", links.ourApproaches);
  setLink("btnDocs", links.documentationDatabase);
  setLink("btnWhyUrc", links.whyUrc);
  setLink("btnUrcSite", links.urcWebsite);
  setLink("btnUrcGuide", links.urcGuidelines);
  setLink("btnBio", links.bioRoverLearnMore);
  setLink("btnDisclaimer", links.disclaimerLearnMore);
  setLink("instaLink", links.instagram);

  /* ---------- Hero background ---------- */
  if (cfg.heroBackground) {
    var img = new Image();
    img.onload = function () {
      $("heroBg").style.backgroundImage =
        "linear-gradient(180deg, rgba(60,40,70,.45), rgba(90,50,40,.25)), url('" + cfg.heroBackground + "')";
    };
    img.src = cfg.heroBackground;
  }

  /* ---------- Rover video slot ---------- */
  if (cfg.roverVideo) {
    var v = document.createElement("video");
    v.autoplay = true; v.loop = true; v.muted = true; v.playsInline = true;
    v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
    if (cfg.roverVideoPoster) v.poster = cfg.roverVideoPoster;
    var s = document.createElement("source");
    s.src = cfg.roverVideo;
    s.type = /\.webm$/i.test(cfg.roverVideo) ? "video/webm" : "video/mp4";
    s.addEventListener("error", function () { v.remove(); $("roverPlaceholder").style.display = ""; });
    v.appendChild(s);
    v.addEventListener("loadeddata", function () { $("roverPlaceholder").style.display = "none"; });
    $("roverFrame").appendChild(v);
  }

  /* ---------- Team Moment: moving background ---------- */
  var bg = cfg.teamBackground || {};
  var momentsBg = $("momentsBg");
  if (bg.src) {
    if (bg.type === "video") {
      var bv = document.createElement("video");
      bv.autoplay = true; bv.loop = true; bv.muted = true; bv.playsInline = true;
      bv.setAttribute("muted", ""); bv.setAttribute("playsinline", "");
      bv.src = bg.src;
      momentsBg.appendChild(bv);
    } else {
      momentsBg.style.backgroundImage = "url('" + bg.src + "')";
      momentsBg.classList.add("pan");
    }
  }
  if (typeof bg.darken === "number") $("momentsShade").style.opacity = bg.darken;

  /* ---------- Team Moment: photo grid ---------- */
  var grid = $("photoGrid");
  (cfg.teamPhotos || []).forEach(function (p) {
    var fig = document.createElement("figure");
    var im = document.createElement("img");
    im.src = p.src; im.alt = p.alt || ""; im.loading = "lazy";
    im.addEventListener("error", function () {
      fig.classList.add("missing");
      fig.textContent = "Add " + p.src;
    });
    fig.appendChild(im);
    grid.appendChild(fig);
  });

  /* ---------- Mobile nav ---------- */
  var toggle = $("navToggle"), list = $("navList");
  toggle.addEventListener("click", function () {
    var open = list.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  list.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { list.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
  });

  /* ---------- Highlight current nav link while scrolling ---------- */
  var navLinks = Array.prototype.slice.call(list.querySelectorAll("a"));
  var map = {};
  navLinks.forEach(function (a) { map[a.getAttribute("href")] = a; });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map["#" + en.target.id]) {
          navLinks.forEach(function (a) { a.classList.remove("active"); });
          map["#" + en.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    ["home", "team", "sponsors", "development", "challenges", "documentation", "contact"].forEach(function (id) {
      var el = $(id); if (el) io.observe(el);
    });
  }

  /* ---------- Email sign-up ---------- */
  var form = $("signupForm"), msg = $("signupMsg");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = $("email").value.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { msg.textContent = "Please enter a valid email address."; return; }
    if (!cfg.signupEndpoint) { msg.textContent = "Sign-up isn't connected yet (see README: Formspree)."; return; }
    msg.textContent = "Sending...";
    fetch(cfg.signupEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ email: email })
    }).then(function (r) {
      if (r.ok) { msg.textContent = "Thanks! You're on the list."; form.reset(); }
      else { msg.textContent = "Something went wrong. Please try again."; }
    }).catch(function () { msg.textContent = "Network error. Please try again."; });
  });
})();
