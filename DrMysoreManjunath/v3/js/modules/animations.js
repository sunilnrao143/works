/* Ambient gold particle field behind the hero.
   Skipped entirely for reduced-motion and for very small viewports. */
window.SM = window.SM || {};

window.SM.animations = function initParticles(){
  var canvas = document.querySelector('[data-particles]');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var dots = [], raf = null, w = 0, h = 0;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  var seed = function(){
    var rect = canvas.getBoundingClientRect();
    w = rect.width; h = rect.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var count = Math.round(Math.min(w * h / 9000, 130));
    dots = [];
    for (var i = 0; i < count; i++){
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        vy: -(Math.random() * 0.18 + 0.03),
        vx: (Math.random() - 0.5) * 0.06,
        a: Math.random() * 0.5 + 0.12,
        tw: Math.random() * 0.02 + 0.004
      });
    }
  };

  var frame = function(){
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < dots.length; i++){
      var d = dots[i];
      d.y += d.vy; d.x += d.vx; d.a += d.tw;
      if (d.a > 0.62 || d.a < 0.1) d.tw *= -1;
      if (d.y < -6){ d.y = h + 6; d.x = Math.random() * w; }
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(224,184,102,' + d.a.toFixed(3) + ')';
      ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  };

  var start = function(){ if (!raf) raf = requestAnimationFrame(frame); };
  var stop  = function(){ if (raf){ cancelAnimationFrame(raf); raf = null; } };

  seed(); start();

  var t;
  window.addEventListener('resize', function(){
    clearTimeout(t); t = setTimeout(function(){ seed(); }, 180);
  });
  // stop burning frames when the hero is off-screen or the tab is hidden
  document.addEventListener('visibilitychange', function(){
    document.hidden ? stop() : start();
  });
  if ('IntersectionObserver' in window){
    new IntersectionObserver(function(e){
      e[0].isIntersecting ? start() : stop();
    }, { threshold:0 }).observe(canvas);
  }
};
