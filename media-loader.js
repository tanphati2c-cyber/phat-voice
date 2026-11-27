"use strict";
// A server that ignores byte ranges cannot reliably seek a streamed MP4.
// Probe with one request. On such servers, keep a complete Blob locally so the
// native player can seek freely. Range-capable hosts keep native streaming.
window.PhatMedia = (() => {
  const cache = new Map();
  let controller = null, generation = 0, stream = null;
  const limit = 2;
  function cancel() { generation++; controller?.abort(); controller = null; stream?.destroy(); stream = null; }
  async function load(video, url, playlist = null) {
    cancel();
    const current = generation;
    controller = new AbortController();
    const signal = controller.signal;
    const source = video.querySelector('source');
    const stage = video.closest('.video-stage');
    let loading = stage.querySelector('.media-loading');
    if (!loading) {
      loading = document.createElement('p');
      loading.className = 'media-loading'; loading.setAttribute('role', 'status');
      loading.textContent = document.documentElement.lang === 'vi' ? 'Đang tải video…' : 'Loading video…';
      stage.append(loading);
    }
    loading.hidden = false; video.controls = false; video.style.opacity = '0';
    const error = document.getElementById(video.dataset.errorId);
    if (error) error.hidden = true;
    const apply = (src, type = "video/mp4") => {
      if (current !== generation) return;
      video.removeAttribute('src'); source.src = src; source.type = type; video.preload = 'metadata';
      video.controls = true; video.style.opacity = ''; video.load();
      loading.hidden = true;
      if (error) error.hidden = true;
    };
    try {
      if (location.protocol === 'file:') { apply(url); return; }
      if (playlist && window.Hls?.isSupported()) {
        source.removeAttribute('src'); video.removeAttribute('src');
        stream = new Hls({enableWorker: false, maxBufferLength: 16, backBufferLength: 10});
        const currentStream = stream;
        currentStream.on(Hls.Events.MANIFEST_PARSED, () => {
          if (current !== generation) return;
          video.controls = true; video.style.opacity = ''; loading.hidden = true;
          if (error) error.hidden = true;
        });
        currentStream.on(Hls.Events.ERROR, (_event, data) => {
          if (current !== generation || !data.fatal) return;
          load(video, url); // Reliable MP4 fallback if streaming is unavailable.
        });
        currentStream.attachMedia(video); currentStream.loadSource(playlist); return;
      }
      if (playlist && video.canPlayType('application/vnd.apple.mpegurl')) {
        apply(playlist, 'application/vnd.apple.mpegurl'); return;
      }
      if (cache.has(url)) {
        const saved = cache.get(url); cache.delete(url); cache.set(url, saved);
        apply(saved); return;
      }
      const response = await fetch(url, {headers: {Range: 'bytes=0-0'}, signal});
      if (!response.ok) throw new Error('Media request failed');
      if (response.status === 206) {
        await response.body?.cancel(); apply(url); return;
      }
      const blob = await response.blob();
      if (current !== generation) return;
      if (!blob.size) throw new Error('Empty video');
      const objectUrl = URL.createObjectURL(new Blob([blob], {type: 'video/mp4'}));
      cache.set(url, objectUrl);
      while (cache.size > limit) {
        const oldest = cache.keys().next().value;
        URL.revokeObjectURL(cache.get(oldest)); cache.delete(oldest);
      }
      apply(objectUrl);
    } catch (err) {
      if (current !== generation || err.name === 'AbortError') return;
      // A transient fetch failure should still allow ordinary native playback.
      apply(url);
    }
  }
  window.addEventListener('pagehide', () => {
    cancel(); for (const url of cache.values()) URL.revokeObjectURL(url); cache.clear();
  });
  return {load, cancel};
})();
