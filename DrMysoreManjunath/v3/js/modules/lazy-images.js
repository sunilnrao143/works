/* Scroll reveal + a decode hint for below-the-fold imagery. */
window.SM = window.SM || {};

window.SM.lazyImages = function initReveal(){
  var targets = [].slice.call(document.querySelectorAll('.reveal'));
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduce){
    targets.forEach(function(el){ el.classList.add('is-in'); });
    return;
  }

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    });
  }, { rootMargin:'0px 0px -12% 0px', threshold:0.08 });

  targets.forEach(function(el, i){
    el.style.transitionDelay = Math.min(i % 5, 4) * 70 + 'ms';
    io.observe(el);
  });
};
