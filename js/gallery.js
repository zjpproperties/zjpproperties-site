// Simple photo viewer for property galleries: click a photo to open it larger.
(function () {
  var gallery = document.querySelector('.gallery');
  var box = document.getElementById('lightbox');
  if (!gallery || !box || typeof box.showModal !== 'function') return;
  var buttons = Array.prototype.slice.call(gallery.querySelectorAll('button'));
  var img = box.querySelector('img');
  var cap = box.querySelector('.lb-cap');
  var current = 0;

  function show(i) {
    current = (i + buttons.length) % buttons.length;
    var src = buttons[current].querySelector('img');
    img.src = src.getAttribute('src');
    img.alt = src.getAttribute('alt');
    cap.textContent = src.getAttribute('alt') + ' (' + (current + 1) + ' of ' + buttons.length + ')';
  }

  buttons.forEach(function (b, i) {
    b.addEventListener('click', function () { show(i); box.showModal(); });
  });
  box.querySelector('[data-prev]').addEventListener('click', function () { show(current - 1); });
  box.querySelector('[data-next]').addEventListener('click', function () { show(current + 1); });
  box.querySelector('[data-close]').addEventListener('click', function () { box.close(); });
  box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
  box.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();
