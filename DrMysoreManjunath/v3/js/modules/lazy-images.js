/* Scroll reveal + a decode hint for below-the-fold imagery. */
window.SM = window.SM || {};

window.SM.lazyImages = function initReveal(){
  var targets = [].slice.call(document.querySelectorAll('.reveal'));
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduce){
    targets.forEach(function(el){ el.classList.add('is-in'); });
    return;
  }

  // only now is it safe to hide them — the observer is about to reveal them
  document.documentElement.classList.add('js-reveal');

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    });
  // reveal a screen early: fast scrolling must never land on a blank section
  }, { rootMargin:'300px 0px 300px 0px', threshold:0 });

  targets.forEach(function(el, i){
    el.style.transitionDelay = Math.min(i % 4, 3) * 60 + 'ms';
    io.observe(el);
  });

  // Safety net. If anything is still hidden after 4s — observer misfire, a
  // throttled background tab, whatever — show it. Content beats animation.
  setTimeout(function(){
    targets.forEach(function(el){ el.classList.add('is-in'); });
  }, 4000);
};
