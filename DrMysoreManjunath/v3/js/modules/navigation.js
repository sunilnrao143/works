/* Mobile drawer + scroll-spy for the primary navigation.
   Classic script (no ES modules) so the site also works from file://. */
window.SM = window.SM || {};

window.SM.navigation = function initNavigation(){
  var toggle = document.querySelector('[data-menu-toggle]');
  var drawer = document.getElementById('mobile-drawer');
  if (toggle && drawer){
    var close = drawer.querySelector('[data-menu-close]');
    var lastFocus = null;

    var open = function(){
      lastFocus = document.activeElement;
      drawer.setAttribute('data-open','true');
      toggle.setAttribute('aria-expanded','true');
      document.body.setAttribute('data-drawer','open');
      (drawer.querySelector('a, button') || drawer).focus();
    };
    var shut = function(){
      drawer.setAttribute('data-open','false');
      toggle.setAttribute('aria-expanded','false');
      document.body.removeAttribute('data-drawer');
      if (lastFocus) lastFocus.focus();
    };

    toggle.addEventListener('click', open);
    if (close) close.addEventListener('click', shut);
    drawer.addEventListener('click', function(e){ if (e.target.tagName === 'A') shut(); });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && drawer.getAttribute('data-open') === 'true') shut();
    });
    // keep the drawer from lingering if the viewport grows back to desktop
    window.addEventListener('resize', function(){
      if (window.innerWidth > 1000 && drawer.getAttribute('data-open') === 'true') shut();
    });
  }

  // scroll-spy: mark the nav link for whichever section owns the viewport
  var links = [].slice.call(document.querySelectorAll('.navlinks a[href^="#"]'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  var map = {};
  links.forEach(function(a){
    var el = document.querySelector(a.getAttribute('href'));
    if (el) map[el.id] = a;
  });

  var spy = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (!entry.isIntersecting) return;
      links.forEach(function(a){ a.removeAttribute('aria-current'); });
      if (map[entry.target.id]) map[entry.target.id].setAttribute('aria-current','page');
    });
  }, { rootMargin:'-45% 0px -50% 0px', threshold:0 });

  Object.keys(map).forEach(function(id){ spy.observe(document.getElementById(id)); });
};
