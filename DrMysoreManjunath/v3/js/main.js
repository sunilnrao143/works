/* Entry point. Modules attach themselves to window.SM and are booted here. */
(function(){
  'use strict';
  document.documentElement.classList.remove('no-js');

  var boot = function(){
    var SM = window.SM || {};
    ['navigation','carousel','lazyImages','animations'].forEach(function(name){
      if (typeof SM[name] !== 'function') return;
      try { SM[name](); }
      catch (err){ console.error('[SM] ' + name + ' failed to start:', err); }
    });

    // newsletter: no endpoint is wired yet, so say so plainly rather than
    // pretending the address was stored. Replace with a real action/fetch.
    var form = document.querySelector('[data-newsletter]');
    if (form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        var note = form.parentNode.querySelector('[data-form-note]');
        if (note) note.textContent = 'Signup isn\u2019t connected yet \u2014 add your mailing-list endpoint in js/main.js.';
      });
    }
  };

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', boot)
    : boot();
})();
