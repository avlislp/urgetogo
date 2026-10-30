// ============================================================
// YOUR YOUTUBE VIDEOS — EDIT ONLY THESE THREE LINKS
// Paste the full YouTube URL between the quotation marks.
// Examples: https://www.youtube.com/watch?v=VIDEO_ID
//           https://youtu.be/VIDEO_ID
//           https://www.youtube.com/shorts/VIDEO_ID
// Leave a link empty ('') to show the original placeholder.
// ============================================================
const videoUrls = [
  'https://www.youtube.com/watch?v=zrg_s52mIR8', // My First Solo Motocamping Trip
  'https://www.youtube.com/watch?v=_SibIpTmHFc', // First Time on a CFMoto 675SR-R
  'https://www.youtube.com/watch?v=qmGFUfu8PQk', // Best Road in the World
];

function getYouTubeId(value) {
  if (!value || typeof value !== 'string') return null;
  try {
    const url = new URL(value.trim());
    const host = url.hostname.toLowerCase();
    let id = null;
    if (host === 'youtu.be' || host === 'www.youtu.be') {
      id = url.pathname.split('/')[1];
    } else if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'].includes(host)) {
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts[0] === 'watch') id = url.searchParams.get('v');
      else if (['shorts', 'live', 'embed'].includes(parts[0])) id = parts[1];
    }
    return /^[a-zA-Z0-9_-]{11}$/.test(id || '') ? id : null;
  } catch { return null; }
}

const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();
videoUrls.forEach((url, i) => {
  const id = getYouTubeId(url);
  if (!id) return;
  const target = document.querySelector(`[data-video="${i + 1}"]`);
  if (!target) return;
  // YouTube requires a valid HTTP(S) referrer for embedded playback.
  // When previewing via file://, provide a playable YouTube link instead.
  if (window.location.protocol === 'file:') {
    const link = document.createElement('a');
    link.href = `https://www.youtube.com/watch?v=${id}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'video-local-preview';
    link.style.backgroundImage = `linear-gradient(#15251b33,#15251b77),url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`;
    link.innerHTML = '<span class="video-play-icon" aria-hidden="true">▶</span><span>Watch on YouTube · Use Live Server to preview embedded videos</span>';
    link.setAttribute('aria-label', `Watch URGE TO GO video ${i + 1} on YouTube`);
    target.replaceWith(link);
    return;
  }
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${id}`;
  iframe.title = `URGE TO GO YouTube video ${i + 1}`;
  iframe.loading = 'lazy';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  target.replaceWith(iframe);
});

const toggle = document.querySelector('.menu');
const nav = document.querySelector('.nav nav');
toggle.addEventListener('click', () => { const isOpen=nav.classList.toggle('open'); toggle.setAttribute('aria-expanded',String(isOpen)); });
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
const topLink = document.querySelector('.back-top');
function updateTop(){topLink.classList.toggle('visible',window.scrollY>350)}
window.addEventListener('scroll',updateTop,{passive:true});updateTop();
