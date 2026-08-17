/* Horizontal scroll controls for the music and tour rails.
   Buttons only appear when the rail genuinely overflows. */
window.SM = window.SM || {};

window.SM.carousel = function initCarousels(){
  [].slice.call(document.querySelectorAll('[data-rail]')).forEach(function(rail){
    var track = rail.querySelector('[data-rail-track]');
    var prev  = rail.querySelector('[data-rail-prev]');
    var next  = rail.querySelector('[data-rail-next]');
    if (!track || !prev || !next) return;

    var step = function(){
      var card = track.firstElementChild;
      var w = card ? card.getBoundingClientRect().width : 240;
      return Math.max(w + 14, track.clientWidth * 0.6);
    };

    var sync = function(){
      var overflow = track.scrollWidth - track.clientWidth > 8;
      prev.setAttribute('data-visible', overflow ? 'true' : 'false');
      next.setAttribute('data-visible', overflow ? 'true' : 'false');
      if (!overflow) return;
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
    };

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var go = function(dir){
      track.scrollBy({ left: dir * step(), behavior: reduce ? 'auto' : 'smooth' });
    };

    prev.addEventListener('click', function(){ go(-1); });
    next.addEventListener('click', function(){ go(1); });
    track.addEventListener('scroll', sync, { passive:true });
    window.addEventListener('resize', sync);

    // keyboard support on the track itself
    track.addEventListener('keydown', function(e){
      if (e.key === 'ArrowRight'){ e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft'){ e.preventDefault(); go(-1); }
    });

    sync();
  });
};
